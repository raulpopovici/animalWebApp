import sleepyDogg from "../../Assets/sleepyDogg.jpeg";
export const EmptyPage = ({ text }: { text: string }) => {
  return (
    <div
      style={{
        display: "flex",
        alignSelf: "center",
        justifySelf: "center",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "60px",
        paddingBottom: "130px",
      }}
    >
      <img
        src={sleepyDogg}
        style={{ height: "300px", width: "300px", marginTop: "-100px" }}
      ></img>
      <div
        style={{
          color: "#000",
          fontFamily: "Open Sans, sans-serif",
          fontSize: "20px",
          marginTop: "-80px",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default EmptyPage;
