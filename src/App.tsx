import React, { useState } from 'react';

interface PasswordValidationCriteria {
  label: string;
  isValid: boolean;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidationCriteria[]>([
    { label: 'One number', isValid: false },
    { label: 'One uppercase letter', isValid: false },
    { label: 'One lowercase letter', isValid: false },
    { label: 'One symbol', isValid: false },
    { label: 'One Latin letter', isValid: false },
    { label: 'Use 14-50 characters', isValid: false },
  ]);


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      email: value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validatePassword(value);
  };

  const handleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };


  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      confirmPassword: value,
    });

    validatePasswordConfirmation(value);
  };


  const validatePasswordConfirmation = (confirmation: string) => {
    setIsPasswordMatch(formData.password === confirmation);
  };
 

  const validatePassword = (password: string) => {
    const updatedPasswordValidation = passwordValidation.map((criteria) => {
      switch (criteria.label) {
        case 'One number':
          criteria.isValid = /[0-9]/.test(password);
          break;
        case 'One uppercase letter':
          criteria.isValid = /[A-Z]/.test(password);
          break;
        case 'One lowercase letter':
          criteria.isValid = /[a-z]/.test(password);
          break;
        case 'One symbol':
          criteria.isValid = /[!@#$%^&*]/.test(password);
          break;
        case 'One Latin letter':
          criteria.isValid = /[a-zA-Z]/.test(password);
          break;
        case 'Use 14-50 characters':
          criteria.isValid = password.length >= 14 && password.length <= 50;
          break;
        default:
          break;
      }
      return criteria;
    });

    setPasswordValidation([...updatedPasswordValidation]);
  };

  const isSubmitDisabled =
    passwordValidation.some((criteria) => !criteria.isValid) ||
    formData.email.trim() === '' ||
    formData.password !== formData.confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
    });

    setPasswordValidation(
      passwordValidation.map((criteria) => ({ ...criteria, isValid: false }))
    );

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <main className="flex items-center justify-center mx-auto w-full min-h-[100vh] bg-gray-800 py-10">
      <form onSubmit={handleSubmit} className='bg-white rounded-lg w-[600px] sm:mx-20 mx-4 sm:p-10 p-6 '>
        <h1 className='sm:text-2xl text-xl text-center'>Sign Up Form</h1>
        <p className='sm:text-lg text-sm pt-4 pb-6 text-center'>Hello there!, fill up this form to create your account</p>
        <div>
          <label htmlFor="email">Email:</label> <br />
          <input
            type="email"
            name="email"
            id="email"
            className='w-full border-2 border-gray-300 rounded-lg px-6 py-3 !focus:border-green-400'
            value={formData.email}
            onChange={handleEmailChange}
          />
        </div>
        <br />
        <div className='relative'>
          <label htmlFor="password">Password:</label> <br />
          <input
            type={formData.showPassword ? 'text' : 'password'}
            autoComplete='off'
            name="password"
            id='password'
            value={formData.password}
            className='w-full border-2 border-gray-300 rounded-lg px-6 py-3 !focus:border-green-400'
            onChange={handlePasswordChange}
          />
          <button className='uppercase absolute top-[38px] right-4 text-gray-500 bg-white' type="button" onClick={handleShowPassword}>
            {formData.showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div>
          <ul className='grid sm:grid-cols-2 grid-cols-1 pt-2 pb-5 gap-2'>
            {passwordValidation?.map((criteria, index) => (
              <li
                key={index}
                className={criteria.isValid ? 'text-green-500' : 'text-gray-400'}
              >
                <span>{criteria.isValid ? <span>&#10003;&nbsp;</span> : <span>&#8226;&nbsp;</span>}</span>
                {criteria.label}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password:</label> <br />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            autoComplete='off'
            className='w-full border-2 border-gray-300 rounded-lg px-6 py-3 !focus:border-green-400'
            value={formData.confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <div className='pt-2'>
          {isPasswordMatch && formData.confirmPassword !== '' ? (
            <p className="text-green-400">&#10003;&nbsp; Password Match</p>
          ) : (
            formData.confirmPassword !== '' && <p className="text-gray-400">&#8226;&nbsp; Password does not match</p>
          )}
        </div>

        {isSubmitted ? (
          <div className='absolute top-5 right-5 px-6 py-3 rounded-lg bg-white'>Submitted Successfully!</div>
        ) : null}
        <button
          type="submit"
          name='submit-form'
          disabled={isSubmitDisabled}
          className={`w-full py-3 rounded-lg text-white text-xl mt-10 ${isSubmitDisabled ? 'bg-gray-400 opacity-50 cursor-not-allowed' : 'bg-gray-800'}`}
        >
          Sign Up
        </button>
      </form>
    </main>
  );
};

export default App;