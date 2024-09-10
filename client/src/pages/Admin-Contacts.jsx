import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts =()=>{

    const [contact,setContact] = useState([]);

    const {autherizationToken,API} = useAuth();


    const AdminContacts = async()=>{

        try {
            const response = await fetch(`${API}/api/admin/contacts`,{
                method: "GET",
                headers:{
                    Authorization : autherizationToken
                }
        
            })
            const data = await response.json();
            console.log("contacts",data);
            if(response.ok){
                setContact(data);
            }
        } catch (error) {
            console.log(error);
        }
       };
       
       const deleteUser =async(id)=>{
        try {
            const response = await fetch(`${API}/api/admin/contacts/delete/${id}`,{
                method: "DELETE",
                headers:{
                    Authorization : autherizationToken
                }
        
            })
            if(response.ok){
                
               
                toast.success("deleted successfully");
                AdminContacts();
            }
        } catch (error) {
            console.log(error);
        }
    
       }
       useEffect(()=>{
        AdminContacts();
       },[])
    return (
        <>
        <section className="admin-users-section">
            <div className="container">
                <h1>Admin Contacts</h1>
            </div>
            <div className="container admin-users">
    
    
               <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>message</th>
                        <th>Delete</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {contact.map((curUser,index)=>{
                        return(
                            
                            <tr key={index}>
                                <td>{curUser.username}</td>
                                <td>{curUser.email}</td>
                                <td>{curUser.message}</td>
                                <td><button className="btn"onClick={()=>deleteUser(curUser._id)}>Delete</button></td>

                                
                            </tr>
                          
                        )
                    })}
                </tbody>
               </table>
            </div>
        </section>
        </>
       )
}