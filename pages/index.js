import Header from "@/components/header";

export default function Home() {
  const divStyle = {
    backgroundImage: 'url("assets/img/fpigate.jpeg")',
    backgroundSize: "cover", // You can adjust these properties as needed
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  return (
    <>
      <Header>
        <div></div>
      </Header>
    </>
  );
}
