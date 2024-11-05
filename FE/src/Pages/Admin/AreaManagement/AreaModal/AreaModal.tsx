import React, { useRef, useState } from "react";
import './AreaModal.css';
import { ApiGateway } from "../../../../Api/ApiGateway";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { TextField } from "@mui/material";

interface PopupType {
  type: string;
  closeModal: () => void;
  addArea?: (name: string, description: string, address: string, longitude: number, latitude: number, images: File[]) => Promise<any>;
  editArea?: (id: string, name: string, description: string, address: string, longitude: number, latitude: number, images: File[]) => Promise<any>;
  area?: any;
}

interface FormData {
  id: string;
  name: string;
  description: string;
  address: string;
  longitude: number;
  latitude: number;
  images: File[] | null;
}

const Modal: React.FC<PopupType> = ({ type, closeModal, addArea, editArea, area }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    description: '',
    address: '',
    longitude: 0,
    latitude: 0,
    images: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files ? Array.from(e.target.files) : null;
    if (files) {
      setFormData({
        ...formData,
        images: files,
      });
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      if (addArea) {
        await addArea(
          formData.name,
          formData.description,
          formData.address,
          formData.longitude,
          formData.latitude,
          formData.images || []
        );
        closeModal();
      }
    } catch (error) {
      console.error("Error adding area:", error);
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      if (editArea) {
        await editArea(
          formData.id,
          formData.name,
          formData.description,
          formData.address,
          formData.longitude,
          formData.latitude,
          formData.images || []
        );
        closeModal();
      }
    } catch (error) {
      console.error("Error updating area:", error);
    }
  };

  switch (type) {
    case 'add':
      return (
        <div id="area_modal">
          <form className="modal" onSubmit={handleAdd}>
            <div className="popup-header">
              <h1>Add New Area</h1>
            </div>
            <div className="modal-content">
              <TextField name="name" label="Name" variant="outlined" fullWidth onChange={handleChange} />
              <TextField name="description" label="Description" variant="outlined" fullWidth onChange={handleChange} />
              <TextField name="address" label="Address" variant="outlined" fullWidth onChange={handleChange} />
              <TextField name="longitude" label="Longitude" type="number" variant="outlined" fullWidth onChange={handleChange} />
              <TextField name="latitude" label="Latitude" type="number" variant="outlined" fullWidth onChange={handleChange} />
              <input type="file" multiple ref={fileInputRef} onChange={handleChangeImage} />

              <div className="modal-btns">
                <button type="button" className="modal-cancel" onClick={closeModal}>Cancel</button>
                <button type="submit" className="modal-confirm">Add Area</button>
              </div>
            </div>
          </form>
        </div>
      );
    case 'edit':
      return (
        <div id="area_modal">
          <form className="modal" onSubmit={handleEdit}>
            <div className="popup-header">
              <h1>Edit Area</h1>
            </div>
            <div className="modal-content">
              <TextField name="name" label="Name" variant="outlined" fullWidth onChange={handleChange} value={formData.name} />
              <TextField name="description" label="Description" variant="outlined" fullWidth onChange={handleChange} value={formData.description} />
              <TextField name="address" label="Address" variant="outlined" fullWidth onChange={handleChange} value={formData.address} />
              <TextField name="longitude" label="Longitude" type="number" variant="outlined" fullWidth onChange={handleChange} value={formData.longitude} />
              <TextField name="latitude" label="Latitude" type="number" variant="outlined" fullWidth onChange={handleChange} value={formData.latitude} />
              <input type="file" multiple ref={fileInputRef} onChange={handleChangeImage} />

              <div className="modal-btns">
                <button type="button" className="modal-cancel" onClick={closeModal}>Cancel</button>
                <button type="submit" className="modal-confirm">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
      );
    default:
      return null;
  }
};

export default Modal;
