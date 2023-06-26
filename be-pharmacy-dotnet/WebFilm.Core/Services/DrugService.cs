using Microsoft.Extensions.Configuration;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Drug;
using WebFilm.Core.Enitites.Property;
using WebFilm.Core.Enitites.Supplier;
using WebFilm.Core.Exceptions;
using WebFilm.Core.Interfaces.Repository;
using WebFilm.Core.Interfaces.Services;
using OpenCvSharp;
using OpenCvSharp.Features2D;

namespace WebFilm.Core.Services
{
    public class DrugService : BaseService<int, Drugs>, IDrugService
    {
        IDrugRepository _drugRepository;
        ISupplierDrugRepository _supplierDrugRepository;
        ISupplierRepository _supplierRepository;
        IPropertyRepository _propertyRepository;
        IUserContext _userContext;
        private readonly IConfiguration _configuration;

        public DrugService(IDrugRepository drugRepository,
            IConfiguration configuration,
            IUserContext userContext,
            ISupplierDrugRepository supplierDrugRepository,
            ISupplierRepository supplierRepository,
            IPropertyRepository propertyRepository) : base(drugRepository)
        {
            _configuration = configuration;
            _drugRepository = drugRepository;
            _userContext = userContext;
            _propertyRepository = propertyRepository;
            _supplierDrugRepository = supplierDrugRepository;
            _supplierRepository = supplierRepository;
        }

        public bool create(DrugDTO dto)
        {
            Drugs drug = new Drugs();
            SupplierDrugs supplierDrugs = new SupplierDrugs();
            int supplierID = dto.supplierID;
            int propertyID = dto.propertyID;

            Suppliers sup = _supplierRepository.GetByID(supplierID);
            if (sup == null)
            {
                throw new ServiceException("Không tìm thấy Supplier");
            }

            Properties properties = _propertyRepository.GetByID(propertyID);
            if (sup == null)
            {
                throw new ServiceException("Không tìm thấy Property");
            }
            //drug
            drug = _drugRepository.create(dto, propertyID);

            //supplierDrug
            supplierDrugs.drugID = drug.id;
            supplierDrugs.supplierID = supplierID;
            _supplierDrugRepository.Add(supplierDrugs);


            return true;
        }

        public bool update(int id, DrugDTO dto)
        {
            Drugs drug = _drugRepository.GetByID(id);
            if (drug == null)
            {
                throw new ServiceException("Không tìm thấy Drug");
            }

            int supplierID = dto.supplierID;
            int propertyID = dto.propertyID;

            Suppliers sup = _supplierRepository.GetByID(supplierID);
            if (sup == null)
            {
                throw new ServiceException("Không tìm thấy Supplier");
            }

            Properties properties = _propertyRepository.GetByID(propertyID);
            if (sup == null)
            {
                throw new ServiceException("Không tìm thấy Property");
            }
            //drug
            _drugRepository.update(id, dto);

            //supplier drug
            SupplierDrugs supplierDrug = _supplierDrugRepository.GetSupplierDrugs(id);

            if (supplierDrug != null)
            {
                supplierDrug.supplierID = supplierID;
                _supplierDrugRepository.Edit(supplierDrug.id, supplierDrug);
            }
            return true;
        }

        public bool action(int id)
        {
            Drugs drug = _drugRepository.GetByID(id);
            if (drug == null)
            {
                throw new ServiceException("Không tìm thấy Drug");
            }

            if (drug.status == "OK")
            {
                drug.status = "MAINTAINING";
            } else
            {
                drug.status = "OK";
            }

            _drugRepository.Edit(id, drug);
            return true;
        }

        public List<DrugResponse> search(string imageUrl)
        {
            List<DrugResponse> res = new List<DrugResponse>();
            List<Drugs> drugs = new List<Drugs>();
            if (String.IsNullOrWhiteSpace(imageUrl))
            {
                drugs = _drugRepository.GetAll().OrderBy(p => p.name).ToList();
            } else
            {
                // Tạo WebClient để tải hình ảnh từ URL
                WebClient webClient = new WebClient();

                // Tải hình ảnh gốc từ URL
                byte[] imageData = webClient.DownloadData(imageUrl);
                Mat sourceImage = Cv2.ImDecode(imageData, ImreadModes.Color);

                // Lấy danh sách các URL hình ảnh đã lưu trữ
                List<string> storedImageUrls = GetStoredImageUrls();

                // Tạo danh sách các URL khớp
                List<string> matchedUrls = new List<string>();

                // Khởi tạo trình trích xuất đặc trưng SIFT
                SIFT sift = SIFT.Create();

                // Trích xuất đặc trưng của hình ảnh gốc
                KeyPoint[] sourceKeypoints;
                Mat sourceDescriptors = new Mat();
                sift.DetectAndCompute(sourceImage, null, out sourceKeypoints, sourceDescriptors);

                foreach (string storedImageUrl in storedImageUrls)
                {
                    // Tải hình ảnh đã lưu trữ từ URL
                    byte[] storedImageData = webClient.DownloadData(storedImageUrl);
                    Mat storedImage = Cv2.ImDecode(storedImageData, ImreadModes.Color);

                    // Trích xuất đặc trưng của hình ảnh đã lưu trữ
                    KeyPoint[] storedKeypoints;
                    Mat storedDescriptors = new Mat();
                    sift.DetectAndCompute(storedImage, null, out storedKeypoints, storedDescriptors);

                    // So sánh đặc trưng của hình ảnh gốc và hình ảnh đã lưu trữ
                    BFMatcher matcher = new BFMatcher(NormTypes.L2);
                    DMatch[][] matches = matcher.KnnMatch(sourceDescriptors, storedDescriptors, k: 2);

                    // Tính toán điểm tương đồng dựa trên tỉ lệ của hai giá trị nhỏ nhất
                    float ratioThreshold = 0.8f;
                    List<DMatch> goodMatches = new List<DMatch>();
                    foreach (DMatch[] match in matches)
                    {
                        if (match.Length == 2 && match[0].Distance < ratioThreshold * match[1].Distance)
                        {
                            goodMatches.Add(match[0]);
                        }
                    }

                    // Kiểm tra số lượng kết quả khớp
                    int minGoodMatches = 200; // Số lượng tối thiểu của kết quả khớp để xác định là khớp
                    if (goodMatches.Count >= minGoodMatches)
                    {
                        matchedUrls.Add(storedImageUrl);
                    }
                }
                drugs = _drugRepository.GetAll().Where(p => matchedUrls.Contains(p.image)).OrderBy(p => p.name).ToList();

            }
            enrichDrugResponse(res, drugs);
            return res;
        }

        public List<string> GetStoredImageUrls()
        {
            // TODO: Lấy danh sách các URL hình ảnh đã lưu trữ từ Firebase Storage hoặc dịch vụ lưu trữ tương tự
            List<Drugs> drugs = _drugRepository.GetAll().ToList();
            // Giả sử đã có danh sách các URL hình ảnh đã lưu trữ
            List<string> storedImageUrls = drugs.Select(p => p.image).ToList();
            //storedImageUrls.Add("https://th.bing.com/th/id/OIP.lrG7cjGpRo4Ieob4vZz1EgHaHa?pid=ImgDet&rs=1");
            //storedImageUrls.Add("https://abclive1.s3.amazonaws.com/2c2edf5e-aa5c-4940-b5c6-6eb1ac32a016/productimage/5099627077262___XL.jpg");

            return storedImageUrls;
        }

        private void enrichDrugResponse(List<DrugResponse> res, List<Drugs> drugs)
        {
            foreach (Drugs ds in drugs)
            {
                DrugResponse drugResponse = new DrugResponse();
                List<SupplierDrugs> spd = _supplierDrugRepository.GetAll().Where(p => p.drugID == ds.id).ToList();
                if (spd.Count > 0)
                {
                    SupplierDrugs s = spd[0];
                    Suppliers supplier = _supplierRepository.GetByID(s.supplierID);
                    drugResponse.supplier = supplier;
                }
                Properties property = _propertyRepository.GetByID(ds.propertyID);
                if (property != null)
                {
                    drugResponse.property = property;
                }
                drugResponse.status = ds.status;
                drugResponse.price = ds.price;
                drugResponse.image = ds.image;
                drugResponse.qty = ds.qty;
                drugResponse.condition = ds.condition;
                drugResponse.exp = ds.exp;
                drugResponse.name = ds.name;
                drugResponse.id = ds.id;
                drugResponse.isPrescription = ds.isPrescription;

                res.Add(drugResponse);
            }
        }
    }
}
