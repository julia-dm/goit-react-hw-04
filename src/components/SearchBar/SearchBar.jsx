import { Field, Form, Formik } from "formik";
import css from "./SearchBar.module.css";
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';  

export default function SearchBar({ onSearch }) {
  return (

    <Formik
      initialValues={{ topic: "" }}
      onSubmit={(values, actions) => {
        if (values.topic.trim() === "") {
          toast.error('Please enter a search term.');  
        } else {
          onSearch(values.topic);
          actions.resetForm();
        }
      }}
    >
    
      <Form className={css.form}>
        <Field 
          autoComplete="off"
          autoFocus
          type="text" 
          name="topic" 
          className={css.input} 
          placeholder="Search images and photos" 
        />
        <button type="submit" className={css.button}>Search</button>
      </Form>
     
    </Formik>

  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};