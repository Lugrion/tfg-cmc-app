// import ControlsData from "./ProfileData/ControlsData";
import ProfileData from "./ProfileData/ProfileData";
import UpdatePasswd from "./ProfileData/UpdatePwd";

const Profile = () => {


    return (
        <div className="container">
            <h1>My Profile</h1>
            <ProfileData />
            <UpdatePasswd />
            {/*

            // Retirada por comodidad para el usuario. La funcionalidad no está completo y/o es imperfecta

            <ControlsData/>

             */}
        </div>
    )
};

export default Profile;