import React, { useRef, useState, useEffect } from "react";
import './ServiceModal.css'
import { ApiGateway } from "../../../../Api/ApiGateway";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { TextField } from "@mui/material";

interface PopupType {
  type: string;
  closeModal: () => void;
  editService?: (id: string, name: string, price: number, image: File) => Promise<any>;
  deleteService?: () => Promise<any>;
  service?: any;
}

interface FormData {
  id: string;
  name: string;
  type: number;
  price: number;
  image: File | null;
}

const Modal:React.FC<PopupType> = ({ type, closeModal, editService, deleteService, service }) => {

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [ isNameFilled, setIsNameFilled ] = useState(true)
  const [ isTypeSelected, setIsTypeSelected ] = useState(true)
  const [ isPriceFilled, setIsPriceFilled ] = useState(true)
  const [ isImageSelected, setImageSelected ] = useState(true)
  const [ formData, setFormData ] = useState<FormData>({
    id: '',
    name: '',
    type: -1, 
    price: 0,
    image: null,
  });

  // handleChange for TextField inputs (Name and Price)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setFormData({
      ...formData,
      type: parseInt(e.target.value)
    });
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
    }
  };

  const addService = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      let error = 0;

      if (formData.image === null) {
        setImageSelected(false)
        error++;
      }

      if (formData.name === '') {
        setIsNameFilled(false);
        error++;
      }

      if (formData.type === -1) {
        setIsTypeSelected(false);
        error++;
      }

      if (formData.price < 5000) {
        setIsPriceFilled(false);
        error++;
      }

      if (error > 0) {
        return;
      }

      const formServiceData = {
        name: formData.name,
        type: formData.type,
        price: formData.price,
        image: formData.image as File,
      };

      console.log("FormServiceData: ", formServiceData);

      const response = await ApiGateway.CreateService(
        formServiceData.name,
        formServiceData.type,
        formServiceData.price,
        formServiceData.image
      );
      console.log('Service created successfully:', response);
      closeModal();
    } catch (error) {
      console.log('Add Service Error:', error);
    }
  };

  const handleClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const forbiddenKeys = ["e", "+", "-", "."];
    if (forbiddenKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleDelete = (): void => {
    if (deleteService) {
      deleteService()
      closeModal()
    }
  }

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    let error = 0;

    if (formData.price < 5000) {
      setIsPriceFilled(false);
      error++;
    }

    if (error > 0) {
      return;
    }

    const formServiceData = {
      id: formData.id,
      name: formData.name,
      price: formData.price,
      image: formData.image instanceof File ? formData.image : null,
    }

    if (editService) {
      console.log(formServiceData)
      const response = ApiGateway.UpdateService(formServiceData.id, formServiceData.name, formServiceData.price, formServiceData.image)
      closeModal()
    }
  }

  useEffect(() => {
    if (service) {
      setFormData({
        id: service.id,
        name: service.name,
        type: service.type,
        price: service.price,
        image: service.image
      })
    }
  },[])

  switch (type) {
    case 'add':
      return (
        <div id="service_modal" style={{display: "static"}}>
          <form className="modal" onSubmit={addService}>
            <div className="popup-header">
              <h1>Add Service</h1>
            </div>
            <div className="modal-content">
              <div className="content">
                <div className="column1">
                  <div className="img-container">
                    {formData.image ?
                      <div className="image-selected">
                        <label htmlFor="input-file1" className="image-label">
                          <img src={URL.createObjectURL(formData.image)} />
                          <input
                            id="input-file1"
                            name="selectedFile1"
                            type="file"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            accept=".png, .jpg"
                            onChange={handleChangeImage}
                          />
                          <button
                            id="upload-image"
                            type="button"
                            onClick={() => {handleClick();}}
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
                      :
                      <div className="image-placeholder">
                        <label htmlFor="input-file1" className="image-label">
                          <div>
                            <AddPhotoAlternateIcon sx={{fontSize: '32px'}}/>
                          </div>
                          <input
                            id="input-file1"
                            name="selectedFile1"
                            type="file"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            accept=".png, .jpg"
                            onChange={handleChangeImage}
                          />
                          <button
                            id="upload-image"
                            type="button"
                            onClick={() => {handleClick();}}
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
                    }
                  </div>
                </div>
                <div className="column2">
                  <label>
                    <div style={{display: "flex", height: "fit-content", alignItems: "center"}}>
                      <p>Name</p>
                      { !isNameFilled ? 
                        <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Name is required</p>
                        :
                        <></>
                      }
                    </div>
                    <TextField name="name" variant="outlined" size="small" fullWidth onChange={handleChange}/>
                  </label>
                  <label>
                    <div style={{display: "flex", height: "fit-content", alignItems: "center"}}>
                      <p>Type</p>
                      { !isTypeSelected ? 
                        <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Type is required</p>
                        :
                        <></>
                      }
                    </div>
                    <select name="type" value={formData.type} onChange={handleTypeChange}>
                      <option value={-1}></option>
                      <option value={0}>Food</option>
                      <option value={1}>Drink</option>
                      <option value={2}>Device</option>
                    </select>
                  </label>
                  <label>
                    <div style={{display: "flex", height: "fit-content", alignItems: "center"}}>
                      <p>Price</p>
                      { !isPriceFilled ? 
                        <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Price should be greater than 5000VND</p>
                        :
                        <></>
                      }
                    </div>
                    <TextField name="price" variant="outlined" size="small" fullWidth onChange={handleChange}/>
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-btns">
              { !isImageSelected ?
                <p style={{margin: 0, color: "red", marginLeft: "5px"}}>*Image is required</p> : <> </>
              }
              <div className="modal-cancel btn" onClick={closeModal}>Cancel</div>
              <button type="submit" className="modal-confirm btn">Confirm</button>
            </div>
          </form>
        </div>
      );
    case 'edit':
      return (
        <div id="service_modal" style={{display: "static"}}>
          <form className="modal" onSubmit={handleEdit}>
            <div className="popup-header">
              <h1>Edit {service ? service.name : 'Service'}</h1>
            </div>
            <div className="modal-content">
              <div className="content">
                <div className="column1">
                  <div className="img-container">
                    {formData.image ?
                      <div className="image-selected">
                        <label htmlFor="input-file1" className="image-label">
                          <img src={formData.image instanceof File
                            ? URL.createObjectURL(formData.image)
                            : formData.image} />
                          <input
                            id="input-file1"
                            name="selectedFile1"
                            type="file"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            accept=".png, .jpg"
                            onChange={handleChangeImage}
                          />
                          <button
                            id="upload-image"
                            type="button"
                            onClick={() => {handleClick();}}
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
                      :
                      <div className="image-placeholder">
                        <label htmlFor="input-file1" className="image-label">
                          <img src={service.image}/>
                          <input
                            id="input-file1"
                            name="selectedFile1"
                            type="file"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            accept=".png, .jpg"
                            onChange={handleChangeImage}
                          />
                          <button
                            id="upload-image"
                            type="button"
                            onClick={() => {handleClick();}}
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
                    }
                  </div>
                </div>
                <div className="column2">
                  <label>
                    <div style={{display: "flex", height: "fit-content", alignItems: "center"}}>
                      <p>Name</p>
                      { !isNameFilled ? 
                        <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Name is required</p>
                        :
                        <></>
                      }
                    </div>
                    <TextField name="name" variant="outlined" size="small" fullWidth onChange={handleChange} placeholder={service.name}/>
                  </label>
                  <label>
                    <div style={{display: "flex", height: "fit-content", alignItems: "center"}}>
                      <p>Type</p>
                      { !isTypeSelected ? 
                        <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Type is required</p>
                        :
                        <></>
                      }
                    </div>
                    <select name="type" value={service.type} onChange={handleTypeChange} disabled>
                      {service.type === 0 ? 
                        <option value={0}>Food</option> 
                        :
                        service.type === 1 ? 
                          <option value={1}>Drink</option>
                          : 
                          <option value={2}>Device</option>
                      }
                    </select>
                  </label>
                  <label>
                    <div style={{display: "flex", height: "fit-content", alignItems: "center"}}>
                      <p>Price</p>
                      { !isPriceFilled ? 
                        <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Price should be greater than 5000VND</p>
                        :
                        <></>
                      }
                    </div>
                    <TextField type="number" name="price" variant="outlined" onKeyDown={handleKeyDown} size="small" fullWidth onChange={handleChange} placeholder={service.price}/>
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-btns">
              { !isImageSelected ?
                <p style={{margin: 0, color: "red", marginLeft: "5px"}}>*Image is required</p> : <> </>
              }
              <div className="modal-cancel btn" onClick={closeModal}>Cancel</div>
              <button type="submit" className="modal-confirm btn">Confirm</button>
            </div>
          </form>
        </div>
      );
    case 'delete':
      return (
        <div>
          <div id="service_delete_modal" style={{display: "static"}}>
            <div className="delete-confirm">
              <ErrorRoundedIcon sx={{color: "#C90000", fontSize: "64px"}}/>
              <p>Are you sure to delete <b>{service.name}</b>?</p>
              <div className="btn-group">
                <div className="cancel" onClick={closeModal}>No</div>
                <div className="confirm" onClick={handleDelete}>Yes</div>
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default Modal;
