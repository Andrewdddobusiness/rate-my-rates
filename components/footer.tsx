import { Image } from "@nextui-org/react";

const Footer: React.FC = () => {
  return (
    <div
      style={{
        marginTop: "6rem",
        marginBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{ marginBottom: "2rem", display: "flex", flexDirection: "row" }}
      >
        <a href="andrewdddobusiness@gmail.com" style={{ paddingRight: "1rem" }}>
          <Image src={"/gmail.svg"} alt="Gmail" height={30} width={30} />
        </a>
        <a
          href="https://www.instagram.com/andrewdddo/"
          style={{ paddingRight: "1rem" }}
        >
          <Image
            src={"/instagram.svg"}
            alt="Instagram"
            height={30}
            width={30}
          />
        </a>
        <a href="https://www.youtube.com/channel/UCLPAUfytUgzLdPZqCo_xPiA">
          <Image src="/youtube.svg" alt="YouTube" height={30} width={30} />
        </a>
      </div>

      <p>Created By Andrew</p>
      <small>&copy; 2023 Rate My Rates. All rights reserved.</small>
    </div>
  );
};

export default Footer;
