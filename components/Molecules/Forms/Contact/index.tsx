import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import UseNotify from '@hooks/UseNotify';
import Button from '@components/Atoms/Button';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './styles.module.scss';

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;
type Props = {
  product: string
}
const FormContact = ({ product }: Props) => {
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef(null) as any;
  const [activeTarget, setActiveTarget] = useState({
    username: false,
    email: false,
    message: false,
  });
  const form = useRef() as any;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFocus = (e: React.FocusEvent<HTMLFormElement>) => {
    setActiveTarget((state) => ({
      ...state,
      [e.target.name]: true,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    if (e.target.value === '') {
      setActiveTarget((state) => ({
        ...state,
        [e.target.name]: false,
      }));
    }
  };

  const handleClick = () => {
    setLoading(true);
    recaptchaRef.current.execute();
  };

  const onReCAPTCHAChange = async (captchaCode: any) => {
    if (!captchaCode) {
      return;
    }
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ captcha: captchaCode }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        emailjs.sendForm('service_dw6uw0s', 'template_y1zjkcx', form.current, '0ylDIbzfo2kaQJi9-')
          .then(() => {
            setLoading(false);
            UseNotify('success', '¡Gracias! Por contactarnos, pronto nos estaremos comunicando...');
            reset();
          }, () => {
            setLoading(false);
            UseNotify('error', '¡Mensaje no enviado, por favor intentalo de nuevo!');
          });
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        UseNotify('error', error.message);
      } else {
        console.log('Unexpected error', error);
      }
    } finally {
      recaptchaRef.current.reset();
    }
  };

  return (
    <form
      ref={form}
      className="form"
      onSubmit={handleSubmit(handleClick)}
      onFocus={(e) => handleFocus(e)}
      onBlur={(e) => handleBlur(e)}
    >
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={recaptchaKey}
        onChange={onReCAPTCHAChange}
      />

      <div className="d-none">
        <input type="hidden" value={product} />
      </div>

      <div className="form-group">
        <label htmlFor="username" className="form-label w-100 position-relative">
          <span className={`${styles.formLabel} ${activeTarget.username ? styles.activeLabel : ''}`}>
            Nombre
          </span>
          <input
            type="text"
            className={`${styles.formInput} ${errors.username ? styles.formInputError : ''} form-control mt-2`}
            {...register('username', { required: true, maxLength: 20 })}
          />
          {errors.username && (
            <span className={styles.inputError}>
              Por favor ingresa un nombre válido
            </span>
          )}
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label w-100 position-relative">
          <span className={`${styles.formLabel} ${activeTarget.email ? styles.activeLabel : ''}`}>
            Email
          </span>
          <input
            type="email"
            className={`${styles.formInput} ${errors.email ? styles.formInputError : ''} form-control mt-2`}
            {...register(
              'email',
              {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'invalid email address',
                },
              },
            )}
          />
          {errors.email && (
            <span className={styles.inputError}>
              Por favor ingresa un email válido
            </span>
          )}
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label w-100 position-relative">
          <span className={`${styles.formLabel} ${activeTarget.message ? styles.activeLabel : ''}`}>
            Mensaje
          </span>
          <textarea
            className={`${styles.formTextArea} form-control mt-2`}
            rows={4}
            {...register('message')}
          />
        </label>
      </div>
      <div className="form-group">
        <Button
          className="btn btn-primary mt-4 text-uppercase py-2 px-4"
          text="Enviar"
          loading={loading}
          submit
        />
      </div>
    </form>
  );
};

export default FormContact;
