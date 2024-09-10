import { Navigate, NavLink, Outlet } from "react-router-dom"
import { FaUser} from "react-icons/fa6";
import { RiContactsBook2Fill } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";
import { MdOutlineMedicalServices } from "react-icons/md";
import { useAuth } from "../../store/auth";


export const AdminLayout =()=>{
    
    const {user,isLoading} = useAuth();
    if(isLoading){
        return <><h1>loading...</h1></>
    }
   if(!user.isAdmin){
    return <><Navigate to="/"/></>
   }
    return (
        <>
         <header>
            <div className="container">
                <nav>
                    <ul>
                        <li><NavLink to="/admin/users"> <FaUser /> users</NavLink></li>
                        <li><NavLink to='/admin/contacts'> <RiContactsBook2Fill /> contacts</NavLink></li>
                        <li><NavLink to='/service' ><MdOutlineMedicalServices /> services</NavLink></li>
                        <li><NavLink to='/'> <IoIosHome /> Home</NavLink></li>
                    </ul>
                </nav>
            </div>
         </header>
         <Outlet/>
        </>
    );
}