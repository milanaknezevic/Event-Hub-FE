const Footer = () => {
    const emailAddress = "support@gmail.com";

    return (
        <div className="container-fluid footer-container">
            <div className="row justify-content-end">
                <div className="col-auto text-end text">
                    {/*<Link onClick={() => handleEmailClick()}*/}
                    {/*      className={"link-c-primary"}>{t("support@solarinvest.ba")}</Link>*/}
                    Contact us: <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
