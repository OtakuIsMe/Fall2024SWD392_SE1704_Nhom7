import React, { useEffect, useState, useContext } from "react";
import { TextField } from "@mui/material";
import './UserModal.css'
import { ApiGateway } from "../../../../Api/ApiGateway";
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { AuthenContext } from "../../../../Components/AuthenContext";

interface PopupType {
  type: string;
  closeModal: () => void;
  banUser?: (id: string, role: number, status: number) => Promise<void>;
  changeRole?: (id: string, role: number, status: number) => Promise<void>;
  userInfo?: any;
}
const Modal:React.FC<PopupType> = ({closeModal, type, userInfo, banUser, changeRole}) => {
  
  const [ isEmailFilled, setIsEmailFilled ] = useState(true);
  const [ isUserNameFilled, setIsUserNameFilled ] = useState(true);
  const [ isPhoneFilled, setIsPhoneFilled ] = useState(true);
  const [ isPwdFilled, setIsPwdFilled ] = useState(true);
  const [ isCfPwdFilled, setIsCfPwdFilled ] = useState(true);
  const [ isCfPwdMatch, setIsCfPwdMatch ] = useState(true);
  const [ userRole, setUserRole ] = useState(0)
  const [ userStatus, setUserStatus ] = useState(0)
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phone: "",
    pwd: "",
    cfPwd: "",
  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const forbiddenKeys = ["e", "+", "-", "."];
    if (forbiddenKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const createUser = async (event: React.FormEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();

    try {
      let error = 0;

      if (formData.email === '') {
        setIsEmailFilled(false);
        error++;
      }

      if (formData.username === '') {
        setIsUserNameFilled(false);
        error++;
      }

      if (formData.phone === '') {
        setIsPhoneFilled(false);
        error++;
      }

      if (formData.pwd === '') {
        setIsPwdFilled(false);
        error++;
      }

      if (formData.cfPwd === '') {
        setIsCfPwdFilled(false);
        error++;
      }

      if (formData.pwd !== formData.cfPwd) {
        setIsCfPwdMatch(false);
        error++;
      }

      if (error > 0) {
        return
      }
      const response = await ApiGateway.Register(formData.email, formData.username, formData.phone, formData.pwd)
      closeModal()
    } catch (error) {
      console.error('Error creating user: ', error);
      throw error;
    }
  }

  const handleChangeRole = () => {
    if (changeRole) {
      changeRole(userInfo.id, userRole, userStatus);
    }
  }

  const handleBanUser = () => {
    if (banUser) {
      if (userInfo.status !== 'Banned') {
        banUser(userInfo.id, getUserRoleCode(userInfo.role), 2);
      } else {
        banUser(userInfo.id, getUserRoleCode(userInfo.role), 0);
      }
    }
  }

  const getUserRoleCode = (role: string) : number => {
    switch (role) {
      case 'Customer': return 0
      case 'Staff': return 1
      case 'Manager': return 2
      case 'Admin': return 3
      default: return 0
    }
  }

  const getUserStatusCode = (role: string) : number => {
    switch (role) {
      case 'Active': return 0
      case 'Banned': return 2
      default: return 0
    }
  }

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{setUserRole(parseInt(e.target.value))}

  useEffect(() => {
    if (userInfo) {
      setUserRole(getUserRoleCode(userInfo.roleId));
      setUserStatus(getUserStatusCode(userInfo.status));
    }
  },[])

  switch (type) {
    case "add":
      return (
        <div id="user_modal" style={{display: "static"}}>
          <form className="modal" onSubmit={createUser}>
            <div className="popup-header">
              <h1>Add User</h1>
            </div>
            <div className="modal-content">
              <div className="content">
                <label>
                  <div style={{display: "flex", alignItems: "center", height: "fit-content"}}>
                    <p>Email</p>
                    { !isEmailFilled ? 
                      <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Name is required</p>
                      :
                      <></>
                    }
                  </div>
                  <TextField name="email" type="text" fullWidth size="small" value={formData.email} onChange={handleChange}/>
                </label>
                <label>
                  <div style={{display: "flex", alignItems: "center", height: "fit-content"}}>
                    <p>User Name</p>
                    { !isUserNameFilled ? 
                      <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*User name is required</p>
                      :
                      <></>
                    }
                  </div>
                  <TextField name="username" type="text" fullWidth size="small" value={formData.username} onChange={handleChange}/>
                </label>
                <label>
                  <div style={{display: "flex", alignItems: "center", height: "fit-content"}}>
                    <p>Phone</p>
                    { !isPhoneFilled ? 
                      <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Phone is required</p>
                      :
                      <></>
                    }
                  </div>
                  <TextField name="phone" type="number" onKeyDown={handleKeyDown} fullWidth size="small" value={formData.phone} onChange={handleChange}/>
                </label>
                <label>
                  <div style={{display: "flex", alignItems: "center", height: "fit-content"}}>
                    <p>Password</p>
                    { !isPwdFilled ? 
                      <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Password is required</p>
                      :
                      <></>
                    }
                  </div>
                  <TextField name="pwd" type="password" fullWidth size="small" value={formData.pwd} onChange={handleChange}/>
                </label>
                <label>
                  <div style={{display: "flex", alignItems: "center", height: "fit-content"}}>
                    <p>Confirm Password</p>
                    { !isCfPwdFilled ? 
                      <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Please confirm password</p>
                      :
                      !isCfPwdMatch ? 
                        <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Confirm password doesn't match</p>
                        :
                        <></>
                    }
                  </div>
                  <TextField name="cfPwd" type="password" fullWidth size="small" value={formData.cfPwd} onChange={handleChange}/>
                </label>
              </div>
            </div>
            <div className="modal-btns">
              <div className="modal-cancel btn" onClick={closeModal}>Cancel</div>
              <button type="submit" className="modal-confirm btn">Confirm</button>
            </div>
          </form>
        </div>
      );
    case "ban":
      return (
        <div>
          <div id="user_ban_modal" style={{display: "static"}}>
            <div className="ban-confirm">
              <ErrorRoundedIcon sx={{color: "#C90000", fontSize: "64px"}}/>
              <p>Are you sure to ban <b>{userInfo? userInfo.username : "this User"}</b>?</p>
              <div className="btn-group">
                <div className="cancel" onClick={closeModal}>No</div>
                <div className="confirm" onClick={handleBanUser}>Yes</div>
              </div>
            </div>
          </div>
        </div>
      );
      case "changerole":
        return (
          <div id="user_change_role_modal" style={{display: "static"}}>
            <div className="modal" onSubmit={createUser}>
              <div className="popup-header">
                <h1>Change Role User</h1>
              </div>
              <div className="modal-content">
                <div className="content">
                  <label>
                    <div style={{display: "flex", alignItems: "center", height: "fit-content"}}>
                      <p>Email</p>
                    </div>
                    <TextField name="email" type="text" size="small" fullWidth value={userInfo.email} disabled/>
                  </label>
                  <label>
                    <div style={{display: "flex", alignItems: "center", height: "fit-content"}}>
                      <p>User Name</p>
                    </div>
                    <TextField name="username" type="text" size="small" fullWidth value={userInfo.username} onChange={handleChange} disabled/>
                  </label>
                  <label>
                    <div style={{display: "flex", alignItems: "center", height: "fit-content"}}>
                      <p>Phone</p>
                    </div>
                    <TextField name="phone" type="number" onKeyDown={handleKeyDown} size="small" fullWidth value={userInfo.phone} onChange={handleChange} disabled/>
                  </label>
                  <label>
                    <div style={{display: "flex", alignItems: "center", height: "fit-content"}}>
                      <p>Role</p>
                    </div>
                    <select value={userRole} onChange={handleRoleChange}>
                      <option value={0}>Customer</option>
                      <option value={1}>Staff</option>
                      <option value={2}>Manager</option>
                      <option value={3}>Admin</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="modal-btns">
                <div className="modal-cancel btn" onClick={closeModal}>Cancel</div>
                <div className="modal-confirm btn" onClick={handleChangeRole}>Confirm</div>
              </div>
            </div>
          </div>
        );
  }
  
};

export default Modal;
