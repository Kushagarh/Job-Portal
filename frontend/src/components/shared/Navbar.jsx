import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
const Navbar = () => {
  // const  user  = useSelector(store => store.auth.user);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
        const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
        if (res.data.success) {
            dispatch(setUser(null));
            navigate("/");
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}
    return (
    <div>
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        <div className='flex items-center gap-12'>
          <ul className="flex font-medium items-center gap-5">
          {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
          </ul>

          {
            !user ? (
              <div className="flex items-center gap-2"> 
                <Link to={"/login"}><Button variant="outline" className="rounded">Login</Button></Link>
                <Link to={"/signup"}><Button className="bg-[#7e54d1] hover:bg-[#59389c] rounded">SignUp</Button></Link>
                </div>
                
            ):(
              <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage className="w-12 h-12 rounded-full" src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 border shadow-sm">
               <div className="">
                <div className="flex gap-4 space-y-2">
                 <Avatar className="cursor-pointer">
                   <AvatarImage className="w-12 h-12 rounded-full p-2" src={user?.profile?.profilePhoto} alt="@shadcn" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div> 
                </div>
  
                <div className="flex flex-col my-2 text-gray-600">
                {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut/>
                      <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                  
                </div>
               </div>
              </PopoverContent>
            </Popover>
            )
          }

          
        </div>
      </div>
    </div>
  );
};

export default Navbar;