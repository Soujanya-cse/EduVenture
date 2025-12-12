import React from "react";

function CompanyPage() {
  const companies = [
    { name: "Infosys", pdf: "/pdfs/Infosys.pdf", logo: "/logos/infosys.jpg" },
    { name: "TCS", pdf: "/pdfs/Tcs.pdf", logo: "/logos/tcs2.jpg" },
    { name: "Wipro", pdf: "/pdfs/Wipro.pdf", logo: "/logos/wipro.jpg" },
    { name: "Accenture", pdf: "/pdfs/Accenture.pdf", logo: "/logos/accenture.jpg" },
    { name: "Google", pdf: "/pdfs/Google.pdf", logo: "/logos/google1.jpg" },
    { name: "HCL", pdf: "/pdfs/HCL.pdf", logo: "/logos/hcl.jpg" },
    { name: "IBM", pdf: "/pdfs/IBM.pdf", logo: "/logos/ibm.jpg" },
    { name: "Hexaware", pdf: "/pdfs/Hexaware.pdf", logo: "/logos/hexaware.jpg" },
    { name: "Intel", pdf: "/pdfs/Intel.pdf", logo: "/logos/intel.jpg" },
    { name: "Oracle", pdf: "/pdfs/Oracle.pdf", logo: "/logos/oracle.jpg" },
    { name: "Mindtree", pdf: "/pdfs/Mindtree.pdf", logo: "/logos/mindtree.jpg" },
    { name: "L&T Infotech", pdf: "/pdfs/LT.pdf", logo: "/logos/lt.jpg" },
    { name: "Dell", pdf: "/pdfs/dell.pdf", logo: "/logos/dell2.jpg" },
    { name: "Samsung", pdf: "/pdfs/Samsung.pdf", logo: "/logos/samsung.jpg" },
    { name: "Zensar", pdf: "/pdfs/Zensar.pdf", logo: "/logos/zensar.jpg" },
  ];

  const handleDownload = (company) => {
    const link = document.createElement("a");
    link.href = company.pdf;
    link.download =`${company.name}_Aptitude.pdf`;
    link.click();
  };

  const pageStyle = {
    backgroundImage: 'url("/bg4.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "50px 20px",
    fontFamily: "Poppins, sans-serif",
    color: "white",
  };

  const cardContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "25px",
    justifyItems: "center",
  };

  return (
    
    <div style={pageStyle}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "2.5rem",
          textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
        }}
      >
       📈 Top Company Aptitude Papers
      </h1>

      <div style={cardContainerStyle}>
        {companies.map((company, index) => {
          const cardStyle = {
            width: "260px",
            height: "260px",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
            cursor: "pointer",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            display: "flex",
            flexDirection: "column",
          };

          const topStyle = {
            height: "50%",
            width: "100%",
            backgroundImage: `url(${company.logo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          };

          const bottomStyle = {
            height: "50%",
            backgroundColor: "#ffffff",
            color: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start", // Aligns text upward
            paddingTop: "15px", // Moves content upward
            textAlign: "center",
          };

          const companyNameStyle = {
            fontSize: "1.4rem", // increased font size
            fontWeight: "600",
            marginBottom: "10px",
            marginTop: "5px", // adds slight upward adjustment
          };

          const buttonStyle = {
            backgroundColor: "#0078ff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 14px",
            cursor: "pointer",
            fontSize: "0.9rem",
            transition: "0.3s",
            marginTop:"20px"
          };

          return (
            <div
              key={index}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
              }}
            >
              {/* Top Half */}
              <div style={topStyle}></div>

              {/* Bottom Half */}
               <div style={bottomStyle}>
                <h2 style={companyNameStyle}>{company.name}</h2>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    style={buttonStyle}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#020d19ff";
                      e.target.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#0078ff";
                      e.target.style.transform = "scale(1)";
                    }}
                    onClick={() => window.open(company.pdf, "_blank")}
                  >
                    👁 View
                  </button>
                  <button
                    style={buttonStyle}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#020d19ff";
                      e.target.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#0078ff";
                      e.target.style.transform = "scale(1)";
                    }}
                    onClick={() => handleDownload(company)}
                  >
                    ⬇ Download
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CompanyPage;


