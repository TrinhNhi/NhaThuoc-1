import { IOrder } from '@/types/models/IOrder';
import { Card, Center, Col, Grid, Loader, Stack, Text } from '@mantine/core';

interface Props {
  close: () => void;
  order: IOrder | null;
}

const ModalDetails = ({ close, order }: Props) => {
  if (!order) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <Stack spacing={'xs'}>
      <Card py={0}>
        <Grid>
          <Col span={7}>
            <Text fw={500}> Tên sản phẩm</Text>
          </Col>
          <Col span={2}>
            <Text fw={500}>Số Lượng</Text>
          </Col>
          <Col span={3}>
            <Text fw={500}>Thành Tiền</Text>
          </Col>
        </Grid>
      </Card>
      <Stack spacing={4}>
        {order.drugs.map((drug) => {
          return (
            <Card withBorder>
              <Grid>
                <Col span={7}>
                  <Text>{drug.name}</Text>
                </Col>
                <Col span={2}>
                  <Text>{drug.qty}</Text>
                </Col>
                <Col span={3}>
                  <Text>{drug.price}</Text>
                </Col>
              </Grid>
            </Card>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default ModalDetails;
