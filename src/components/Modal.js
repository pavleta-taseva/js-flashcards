import * as authService from '../services/authService.js';
import { useNavigate } from 'react-router-dom';

function Modal(props) {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  async function deleteAccount() {
    try {
      await authService.onDelete(userId);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='modal'>
      <p>{props.text}</p>
      <button className='btn btn--alt' onClick={props.onClose}>
        Cancel
      </button>
      <button className='btn' onClick={deleteAccount}>
        Confirm
      </button>
    </div>
  );
}

export default Modal;