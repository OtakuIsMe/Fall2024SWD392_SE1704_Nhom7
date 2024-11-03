import React, { useState, useRef, useEffect } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './RoomModal.css'
import { TextField } from "@mui/material";
import { ApiGateway } from "../../../../Api/ApiGateway";

interface PopupType {
  type: string;
  closeModal: () => void;
  editRoom?: (id: string, name: string, price: number, image: File) => Promise<any>;
  deleteRoom?: () => Promise<any>;
  room?: any;
}
const Modal:React.FC<PopupType> = ({type, closeModal, editRoom, deleteRoom, room }) => {

  const maxImages = 4;
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [ areaList, setAreaList ] = useState<any>([]);
  const [ images, setImages ] = useState<(File | null)[]>([null]);
  const [ areaId, setAreaId ] = useState('');
  const [ roomType, setRoomType ] = useState<number>(-1);
  const [ name, setName ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ description, setDescription ] = useState('');

  const [ isAreaIdSelected, setIsAreaIdSelected ] = useState(true);
  const [ isRoomTypeSelected, setIsRoomTypeSelected ] = useState(true);
  const [ isNameFilled, setIsNameFilled ] = useState(true);
  const [ isPriceFilled, setIsPriceFilled ] = useState(true);
  const [ isDescriptionFilled, setIsDescriptionFilled ] = useState(true);
  const [ isImageSelected, setIsImageSelected ] = useState(true);

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);

      if (updatedImages.length < maxImages && !updatedImages.includes(null)) {
        setImages([...updatedImages, null]);
        fileInputRefs.current.push(null);
      }
    }
    console.log(images)
  };

  const handleClick = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  const handleRemoveImageField = (index: number) => {
    let updatedImages = images.filter((_, i) => i !== index);

    updatedImages = updatedImages.filter((img) => img !== null && img !== undefined);

    if (updatedImages.length < maxImages) {
        updatedImages.push(null);
    }

    setImages(updatedImages);

    fileInputRefs.current = fileInputRefs.current.filter((_, i) => i !== index);
    fileInputRefs.current.push(null); 
    console.log(images)
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const forbiddenKeys = ["e", "+", "-", "."];
    if (forbiddenKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => setAreaId(event.target.value);
  const handleRoomTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => setRoomType(parseInt(event.target.value, 10));
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => setPrice(event.target.value);
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value);

  useEffect(() => {
    getArea()
    if(room){
      setImages(room.images)
      setAreaId(room.id)
      // setRoomType(room.type)
      setName(room.name)
      setPrice(room.price)
      setDescription(room.description)
    }
  },[])

  const getArea = async () : Promise<void> => {
    try {
      const response = await ApiGateway.GetArea()
      setAreaList(response)
    } catch (error) {
      console.error("Error getting Areas: ", error)
      throw error
    }
  }
  
  const createRoom = async (e: React.FormEvent<HTMLFormElement>) : Promise<void> => {
    e.preventDefault()

    try {
      let error = 0
      
      if (areaId === '') {
        setIsAreaIdSelected(false)
        error++
      }

      if (roomType === -1) {
        setIsRoomTypeSelected(false)
        error++
      }

      if (name === '') {
        setIsNameFilled(false)
        error++
      }

      if (parseInt(price) < 50000) {
        setIsPriceFilled(false)
        error++
      }

      if (description === '') {
        setIsDescriptionFilled(false)
        error++
      }

      if (images.length === 0 || (images.length === 1 && images[0] === null)) {
        setIsImageSelected(false)
        error++
      }

      if (error > 0) {
        return
      }

      const filteredImages = images.filter((image): image is File => image !== null);

      const response = await ApiGateway.CreateRoom(areaId, roomType, name, price, description, filteredImages)
      console.log(response)
    } catch (error) {
      console.error("Error creating Room: ", error)
      throw error
    }
  }

  switch (type) {
    case "add":
      return (
        <div id="room_modal" style={{display: "static"}}>
          <form className="modal" onSubmit={createRoom}>
            <div className="popup-header">
              <h1>Add Room</h1>
            </div>
            <div className="modal-content">
              <div className="content">
                <div className="column1">
                    {images.map((image, index) => (
                      <div className="img-container" key={index}>
                          <div className={`image image${index+1}`}>
                              {image ? (
                                <div className="image-selected">
                                  <label htmlFor={`input-file${index}`} className="image-label">
                                    <img src={URL.createObjectURL(image)} alt={`Selected ${index}`}/>
                                    <input
                                      id={`input-file${index}`}
                                      name={`selectedFile${index}`}
                                      type="file"
                                      style={{ display: "none" }}
                                      accept=".png, .jpg"
                                      onChange={(event) => handleChangeImage(event, index)}
                                    />
                                  </label>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveImageField(index)}
                                    className="remove-image-button"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ):(
                                <div className="image-placeholder">
                                  <label htmlFor={`input-file${index}`} className="image-label">
                                    <div onClick={() => handleClick(index)}>
                                      <AddPhotoAlternateIcon sx={{ fontSize: '32px' }} />
                                    </div>
                                    <input
                                      id={`input-file${index}`}
                                      name={`selectedFile${index}`}
                                      type="file"
                                      style={{ display: "none" }}
                                      accept=".png, .jpg"
                                      onChange={(event) => handleChangeImage(event, index)}
                                    />
                                  </label>
                                </div>
                              )}
                          </div>
                      </div>
                    ))}
                </div>
                <div className="column2">
                  <div style={{display: 'flex', gap: "20%"}}>
                    <label>
                      <div style={{display: "flex", height: "fit-content", alignItems: "center"}}>
                        <p>Area</p>
                        {!isAreaIdSelected ? 
                          <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Area is required</p>
                          :
                          <></>
                        }
                      </div>
                      <select name="type" value={areaId} onChange={handleAreaChange}>
                        <option value={''}></option>
                        {areaList?.map((area: any) =>
                          <option value={area.id}>{area.name}</option>
                        )}
                      </select>
                    </label>
                    <label>
                      <div style={{display: "flex", height: "fit-content", alignItems: "center"}}>
                        <p>Type</p>
                        {!isRoomTypeSelected ?
                          <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Type is required</p>
                          :
                          <></>
                        }
                      </div>
                      <select name="type" value={roomType} onChange={handleRoomTypeChange}>
                        <option value={-1}></option>
                        <option value={0}>Single</option>
                        <option value={1}>Double</option>
                        <option value={2}>Fourth</option>
                        <option value={3}>Meeting</option>
                      </select>
                    </label>
                  </div>
                  <label>
                    <div style={{display: "flex", height: "fit-content", alignItems: "center"}}>
                      <p>Name</p>
                      {!isNameFilled ?
                        <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Name is required</p>
                        :
                        <></>  
                      }
                    </div>
                    <TextField name="name" variant="outlined" size="small" fullWidth value={name} onChange={handleNameChange}/>
                  </label>
                  <label>
                    <div style={{display: "flex", height: "fit-content", alignItems: "center"}}>
                      <p>Price</p>
                      {!isPriceFilled ?
                        <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Price should be more than 50.000</p>
                        :
                        <></>
                      }
                    </div>
                    <TextField type="text" inputMode="numeric" name="price" variant="outlined" size="small" fullWidth value={price} onChange={handlePriceChange}/>
                  </label>
                  <label>
                    <div style={{display: "flex", height: "fit-content", alignItems: "center"}}>
                      <p>Description</p>
                      {!isDescriptionFilled ?
                        <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Description is required</p>
                        :
                        <></>
                      }
                    </div>
                    <TextField name="name" variant="outlined" size="small" fullWidth multiline rows={2} value={description} onChange={handleDescriptionChange}/>
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-btns">
              {!isImageSelected ?
                <p style={{margin: 0, color: "red", marginLeft: "5px"}}>*Image is required</p> : <> </>
              }
              <div className="modal-cancel btn" onClick={closeModal}>Cancel</div>
              <button type="submit" className="modal-confirm btn">Confirm</button>
            </div>
          </form>
        </div>
      );
    case "edit":
      return (
        <div id="room_modal" style={{display: "static"}}>
          <form className="modal" onSubmit={createRoom}>
            <div className="popup-header">
              <h1>Edit {room ? room.name: 'Room'}</h1>
            </div>
            <div className="modal-content">
              <div className="content">
                <div className="column1">
                    {images.map((image, index) => (
                      <div className="img-container" key={index}>
                          <div className={`image image${index+1}`}>
                              {image ? (
                                <div className="image-selected">
                                  <label htmlFor={`input-file${index}`} className="image-label">
                                    <img src={image instanceof File ? URL.createObjectURL(image) : image} alt={`Selected ${index}`}/>
                                    <input
                                      id={`input-file${index}`}
                                      name={`selectedFile${index}`}
                                      type="file"
                                      style={{ display: "none" }}
                                      accept=".png, .jpg"
                                      onChange={(event) => handleChangeImage(event, index)}
                                    />
                                  </label>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveImageField(index)}
                                    className="remove-image-button"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ):(
                                <div className="image-placeholder">
                                  <label htmlFor={`input-file${index}`} className="image-label">
                                    <div onClick={() => handleClick(index)}>
                                      <AddPhotoAlternateIcon sx={{ fontSize: '32px' }} />
                                    </div>
                                    <input
                                      id={`input-file${index}`}
                                      name={`selectedFile${index}`}
                                      type="file"
                                      style={{ display: "none" }}
                                      accept=".png, .jpg"
                                      onChange={(event) => handleChangeImage(event, index)}
                                    />
                                  </label>
                                </div>
                              )}
                          </div>
                      </div>
                    ))}
                </div>
                <div className="column2">
                  <div style={{display: 'flex', gap: "20%"}}>
                    <label>
                      <div style={{display: "flex", height: "fit-content", alignItems: "center"}}>
                        <p>Area</p>
                        {!isAreaIdSelected ? 
                          <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Area is required</p>
                          :
                          <></>
                        }
                      </div>
                      <select name="type" value={areaId} onChange={handleAreaChange}>
                        <option value={''}></option>
                        {areaList?.map((area: any) =>
                          <option value={area.id}>{area.name}</option>
                        )}
                      </select>
                    </label>
                    <label>
                      <div style={{display: "flex", height: "fit-content", alignItems: "center"}}>
                        <p>Type</p>
                        {!isRoomTypeSelected ?
                          <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Type is required</p>
                          :
                          <></>
                        }
                      </div>
                      <select name="type" value={roomType} onChange={handleRoomTypeChange}>
                        <option value={-1}></option>
                        <option value={0}>Single</option>
                        <option value={1}>Double</option>
                        <option value={2}>Fourth</option>
                        <option value={3}>Meeting</option>
                      </select>
                    </label>
                  </div>
                    <label>
                    <div style={{display: "flex", height: "fit-content", alignItems: "center"}}>
                      <p>Name</p>
                    </div>
                    <TextField variant="outlined" size="small" fullWidth onChange={handleNameChange} placeholder={room.name}/>
                  </label>
                  <label>
                    <div style={{display: "flex", height: "fit-content", alignItems: "center"}}>
                      <p>Price</p>
                      {!isPriceFilled ?
                        <p style={{color: "red", fontSize: "0.7rem", marginLeft: "5px"}}>*Price should be more than 50.000</p>
                        :
                        <></>
                      }
                    </div>
                    <TextField type="number" onKeyDown={handleKeyDown} name="price" variant="outlined" size="small" fullWidth onChange={handlePriceChange} placeholder={room.price}/>
                  </label>
                  <label>
                    <div style={{display: "flex", height: "fit-content", alignItems: "center"}}>
                      <p>Description</p>
                    </div>
                    <TextField variant="outlined" size="small" fullWidth multiline rows={2} onChange={handleDescriptionChange} placeholder={room.description}/>
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-btns">
              {!isImageSelected ?
                <p style={{margin: 0, color: "red", marginLeft: "5px"}}>*Image is required</p> : <> </>
              }
              <div className="modal-cancel btn" onClick={closeModal}>Cancel</div>
              <button type="submit" className="modal-confirm btn">Confirm</button>
            </div>
          </form>
        </div>
      );
    case "delete":
  }
};

export default Modal;
