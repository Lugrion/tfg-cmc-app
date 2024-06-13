// import ControlsData from "./ProfileData/ControlsData";
import ProfileData from "./ProfileData/ProfileData";
import UpdatePasswd from "./ProfileData/UpdatePwd";

const Profile = () => {


    return (
        <div className="container">

            <div className="row">
                <div className="col-lg-8 col-md-12 mb-4">
                    <ProfileData />
                </div>
                <div className="col-lg-4 col-md-12">
                    <UpdatePasswd />
                </div>
                {/*

                // Retirada por comodidad para el usuario. La funcionalidad no está completo y/o es imperfecta

                <ControlsData/>

                */}
            </div>
        </div>
    )
};

export default Profile;