import React, { useRef, useState, useEffect } from "react";
import './MembershipModal.css';
import { ApiGateway } from "../../../../Api/ApiGateway";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { TextField } from "@mui/material";

interface PopupType {
  type: string;
  closeModal: () => void;
  editMembership?: (id: string, name: string, discount: number, dayLeft: number, price: number, rank: number) => Promise<any>;
  deleteMembership?: () => Promise<any>;
  membership?: any;
}


interface FormData {
  id: string;
  name: string;
  discount: number;
  dayLeft: number;
  price: number;
  rank: number;
}

const MembershipModal: React.FC<PopupType> = ({ type, closeModal, editMembership, deleteMembership, membership }) => {

  const [isNameFilled, setIsNameFilled] = useState(true);
  const [isDiscountFilled, setIsDiscountFilled] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    discount: 0,
    dayLeft: 0,
    price: 0,
    rank: 0,
  });

  // handleChange for TextField inputs (Name, Discount, DayLeft, Price, Rank)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: name === 'discount' || name === 'dayLeft' || name === 'price' || name === 'rank'
            ? Number(value)
            : value,
    });
};


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    let error = 0;

    if (formData.name === '') {
      setIsNameFilled(false);
      error++;
    }

    if (formData.discount < 0) {
      setIsDiscountFilled(false);
      error++;
    }

    if (error > 0) {
      return;
    }

    try {
      if (type === 'edit' && editMembership) {
        await editMembership(
          formData.id,
          formData.name,
          formData.discount,
          formData.dayLeft,
          formData.price,
          formData.rank
        );
        console.log('Membership edited successfully');
      }

      if (type === 'add') {
        await ApiGateway.CreateMembership(
          formData.name,
          formData.discount,
          formData.dayLeft,
          formData.price,
          formData.rank
        );
        console.log('Membership created successfully');
      }

      closeModal();
    } catch (error) {
      console.error('Error handling membership:', error);
    }
  };

  const handleDelete = (): void => {
    if (deleteMembership) {
      deleteMembership();
      closeModal();
    }
  };

  useEffect(() => {
    if (membership) {
      setFormData({
        id: membership.id,
        name: membership.name,
        discount: membership.discount,
        dayLeft: membership.dayLeft,
        price: membership.price,
        rank: membership.rank,
      });
    }
  }, [membership]);

  switch (type) {
    case 'add':
      return (
        <div id="membership_modal">
          <form className="modal" onSubmit={handleSubmit}>
            <div className="popup-header">
              <h1>Add Membership</h1>
            </div>
            <div className="modal-content">
              <div className="content">
                <label>
                  <p>Name</p>
                  {!isNameFilled && <p style={{ color: 'red' }}>*Name is required</p>}
                  <TextField name="name" variant="outlined" size="small" fullWidth onChange={handleChange} />
                </label>
                <label>
                  <p>Discount (%)</p>
                  {!isDiscountFilled && <p style={{ color: 'red' }}>*Discount must be valid</p>}
                  <TextField name="discount" type="number" variant="outlined" size="small" fullWidth onChange={handleChange} />
                </label>
                <label>
                  <p>Day Left</p>
                  <TextField name="dayLeft" type="number" variant="outlined" size="small" fullWidth onChange={handleChange} />
                </label>
                <label>
                  <p>Price</p>
                  <TextField name="price" type="number" variant="outlined" size="small" fullWidth onChange={handleChange} />
                </label>
                <label>
                  <p>Rank</p>
                  <TextField name="rank" type="number" variant="outlined" size="small" fullWidth onChange={handleChange} />
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
    case 'edit':
      return (
        <div id="membership_modal">
          <form className="modal" onSubmit={handleSubmit}>
            <div className="popup-header">
              <h1>Edit Membership</h1>
            </div>
            <div className="modal-content">
              <div className="content">
                <label>
                  <p>Name</p>
                  <TextField name="name" variant="outlined" size="small" fullWidth value={formData.name} onChange={handleChange} />
                </label>
                <label>
                  <p>Discount (%)</p>
                  <TextField name="discount" type="number" variant="outlined" size="small" fullWidth value={formData.discount} onChange={handleChange} />
                </label>
                <label>
                  <p>Day Left</p>
                  <TextField name="dayLeft" type="number" variant="outlined" size="small" fullWidth value={formData.dayLeft} onChange={handleChange} />
                </label>
                <label>
                  <p>Price</p>
                  <TextField name="price" type="number" variant="outlined" size="small" fullWidth value={formData.price} onChange={handleChange} />
                </label>
                <label>
                  <p>Rank</p>
                  <TextField name="rank" type="number" variant="outlined" size="small" fullWidth value={formData.rank} onChange={handleChange} />
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
    case 'delete':
      return (
        <div id="membership_delete_modal">
          <div className="delete-confirm">
            <ErrorRoundedIcon sx={{ color: "#C90000", fontSize: "64px" }} />
            <p>Are you sure to delete <b>{membership.name}</b>?</p>
            <div className="btn-group">
              <div className="cancel" onClick={closeModal}>No</div>
              <div className="confirm" onClick={handleDelete}>Yes</div>
            </div>
          </div>
        </div>
      );
  }
};

export default MembershipModal;
