import React, { useRef, useState } from "react";
import './ServiceModal.css'
import { ApiGateway } from "../../../../Api/ApiGateway";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { TextField } from "@mui/material";

interface PopupType {
  closeModal: () => void;
}

interface FormData {
  name: string;
  type: number;
  price: number;
  image: File | null;
}

const Modal:React.FC<PopupType> = ({ closeModal }) => {

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    type: 0, 
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

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
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
      const formServiceData = {
        name: formData.name,
        type: formData.type,
        price: formData.price,
        image: formData.image as File,
      };

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
                <p>Name</p>
                <TextField name="name" variant="outlined" size="small" fullWidth onChange={handleChange}/>
              </label>
              <label>
                <p>Type</p>
                <select name="type" value={formData.type} onChange={handleTypeChange}>
                  <option value={0}>Food</option>
                  <option value={1}>Drink</option>
                  <option value={2}>Device</option>
                </select>
              </label>
              <label>
                <p>Price</p>
                <TextField name="price" variant="outlined" size="small" fullWidth onChange={handleChange}/>
              </label>
            </div>
          </div>
        </div>
        <div className="modal-btns">
          <div className="modal-cancel btn" onClick={closeModal}>Cancel</div>
          <button type="submit" className="modal-confirm btn">Confirm</button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
