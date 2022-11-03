import Error from "components/common/Error";

const NotFoundPage = () => {
  return (
    <Error
      title={"404"}
      description={"해당 페이지는 존재하지 않아요"}
      path={"/store"}
    />
  );
};

export default NotFoundPage;
