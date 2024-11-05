import React, { useRef, useState, useEffect } from "react";
import './AreaModal.css';
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
    id: area?.id || '',
    name: area?.name || '',
    description: area?.description || '',
    address: area?.address || '',
    longitude: area?.longitude || 0,
    latitude: area?.latitude || 0,
    images: null,
  });

  useEffect(() => {
    if (area) {
      setFormData({
        id: area.id,
        name: area.name,
        description: area.description,
        address: area.address,
        longitude: area.longitude,
        latitude: area.latitude,
        images: null,
      });
    }
  }, [area]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'longitude' || name === 'latitude' ? parseFloat(value) : value,
    }));
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files ? Array.from(e.target.files) : null;
    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));
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

  return (
    <div id="area_modal">
      <form className="modal" onSubmit={type === 'add' ? handleAdd : handleEdit}>
        <div className="popup-header">
          <h1>{type === 'add' ? 'Add New Area' : 'Edit Area'}</h1>
        </div>
        <div className="modal-content">
          <TextField name="name" label="Name" variant="outlined" fullWidth onChange={handleChange} value={formData.name} />
          <TextField name="description" label="Description" variant="outlined" fullWidth onChange={handleChange} value={formData.description} />
          <TextField name="address" label="Address" variant="outlined" fullWidth onChange={handleChange} value={formData.address} />
          <TextField name="longitude" label="Longitude" type="number" variant="outlined" fullWidth onChange={handleChange} value={formData.longitude} />
          <TextField name="latitude" label="Latitude" type="number" variant="outlined" fullWidth onChange={handleChange} value={formData.latitude} />
          <input type="file" multiple ref={fileInputRef} onChange={handleChangeImage} />
        </div>
        <div className="modal-btns">
          <button type="button" className="modal-cancel" onClick={closeModal}>Cancel</button>
          <button type="submit" className="modal-confirm">{type === 'add' ? 'Add Area' : 'Save Changes'}</button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
