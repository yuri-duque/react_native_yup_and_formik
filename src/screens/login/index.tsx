import {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {loginData} from './types';
import {Error, Success} from './styles';

export const Login = () => {
  const [success, setSuccess] = useState(false);

  const initialValues: loginData = {
    cpf: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    cpf: Yup.string().required('CPF is required').label('CPF'),
    email: Yup.string().when('cpf', {
      is: '123',
      then: schema =>
        schema
          .required('Email is required')
          .email('Email is not email')
          .label('Email'),
    }),
    password: Yup.string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required')
      .label('Password'),
  });

  const onSubmit = (values: loginData) => {
    console.log('submit', values);
    setSuccess(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <TextInput
            placeholder="CPF"
            onChangeText={handleChange('cpf')}
            onBlur={handleBlur('cpf')}
            value={values.cpf}
          />
          <Error>{errors.cpf}</Error>

          {values.cpf === '123' && (
            <>
              <TextInput
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <Error>{errors.email}</Error>
            </>
          )}

          <TextInput
            placeholder="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          <Error>{errors.password}</Error>

          <Button onPress={() => handleSubmit()} title="Submit" />

          {success && <Success>Success</Success>}
        </View>
      )}
    </Formik>
  );
};
