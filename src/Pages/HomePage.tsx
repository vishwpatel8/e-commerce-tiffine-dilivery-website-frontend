import leftimg from "../assets/leftpn.png";
import rightimg from "../assets/appDownload.png";
const HomePage = () => {
    return(
        <div className="flex flex-col gap-12 ">
            <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-4xl font-bold tracking-tight text-[#0E592C]"> What are you waiting for?</h1>
                <span className="text-xl ">Food is just click away! <b>From Best Homechefs</b></span>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={leftimg} />
                <div className="flex flex-col item-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tight  ">Order Take away even faster!</span>
                    <span>Download the AAHARPETIKA for faster ordering and personalize reccoandations</span>
                    <img src={rightimg} className="mx-auto w-[400px]" />
                </div>
            </div>
        </div>
    );
};

export default HomePage;