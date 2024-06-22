import PropTypes from "prop-types";
import { FormProvider } from "./FormContext";

const ContextProvider = ({ children }) => {
  return <FormProvider>{children}</FormProvider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
