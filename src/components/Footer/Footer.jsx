const Footer = () => {
    const emailAddress = "support@gmail.com";

    return (
        <div className="container-fluid footer-container">
            <div className="row justify-content-end">
                {/*<div className={"col-7 text-end text"}>*/}
                {/*    &copy; 2024 Event Hub. All right reserved.*/}

                {/*</div>*/}
                {/*<div className={"col-5 text-end text"}>*/}
                {/*    Contact us: <a href={`mailto:${emailAddress}`}>{emailAddress}</a>*/}

                {/*</div>*/}
                <div className={"col-12 text-end text"}>
                    &copy; 2024 Event Hub. All right reserved.

                </div>
                <div className={"col-12 text-end text"}>
                    Contact us: <a href={`mailto:${emailAddress}`}>{emailAddress}</a>

                </div>

            </div>
        </div>
    );
};

export default Footer;
