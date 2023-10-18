const Orderindex = ({ orders }) => {
  return (
    <ul>
      {orders.map((order) => {
        return (
          <l1 key={order.id}>
            {order.ticket.title} - {order.status}
          </l1>
        );
      })}
    </ul>
  );
};

Orderindex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default Orderindex;
