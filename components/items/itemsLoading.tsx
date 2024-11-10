const ItemsLoading = () => {
  return (
    <div className='flex flex-wrap justify-center'>
      {Array.from(Array(15).keys()).map((_idx) => (
        <div
          key={_idx}
          className='w-64 h-96 bg-balasticSea/80 animate-pulse m-5 rounded-2xl'
        />
      ))}
    </div>
  );
};

export default ItemsLoading;
