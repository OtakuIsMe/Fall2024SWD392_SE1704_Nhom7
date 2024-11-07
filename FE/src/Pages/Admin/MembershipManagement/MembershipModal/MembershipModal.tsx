import React, { useRef, useState, useEffect } from "react";
import './MembershipModal.css';
import { ApiGateway } from "../../../../Api/ApiGateway";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { TextField } from "@mui/material";

interface PopupType {
  type: string;
  closeModal: () => void;
  editMembership?: (id: string, name: string, discount: number, project: string, rank: number) => Promise<any>;
  deleteMembership?: () => Promise<any>;
  membership?: any;
}

interface FormData {
  id: string;
  name: string;
  discount: number;
  project: string;
  rank: number;
}

const MembershipModal: React.FC<PopupType> = ({ type, closeModal, editMembership, deleteMembership, membership }) => {

  const [isNameFilled, setIsNameFilled] = useState(true);
  const [isDiscountFilled, setIsDiscountFilled] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    discount: 0,
    project: '',
    rank: 0,
  });

  // handleChange for TextField inputs (Name, Discount, Project, Rank)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
      const formMembershipData = {
        id: formData.id,
        name: formData.name,
        discount: formData.discount,
        project: formData.project,
        rank: formData.rank,
      };

      if (type === 'edit' && editMembership) {
        await editMembership(
          formMembershipData.id,
          formMembershipData.name,
          formMembershipData.discount,
          formMembershipData.project,
          formMembershipData.rank
        );
        console.log('Membership edited successfully');
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
        project: membership.project,
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
                  <p>Project</p>
                  <TextField name="project" variant="outlined" size="small" fullWidth onChange={handleChange} />
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
                  <p>Project</p>
                  <TextField name="project" variant="outlined" size="small" fullWidth value={formData.project} onChange={handleChange} />
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
