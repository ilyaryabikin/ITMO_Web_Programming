package se.ifmo.web.validator;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator("xDataValidator")
public class xDataValidator implements Validator {
    @Override
    public void validate(FacesContext context, UIComponent component, Object value) throws ValidatorException {
        FacesMessage message = new FacesMessage();
        if (value == null) {
            message.setSummary("Требуется ввести значение");
            message.setSeverity(FacesMessage.SEVERITY_ERROR);
            throw new ValidatorException(message);
        }
        if (!(value.toString().matches("[-+]?[0-9]*[.,]?[0-9]+(?:[eE][-+]?[0-9]+)?"))) {
            message.setSummary("Неверный формат данных");
            message.setSeverity(FacesMessage.SEVERITY_ERROR);
            throw new ValidatorException(message);
        }
        if (Double.parseDouble(value.toString()) < -5 || Double.parseDouble(value.toString()) > 5) {
            message.setSummary("Координата не лежит в допустимом диапазоне");
            message.setSeverity(FacesMessage.SEVERITY_ERROR);
            throw new ValidatorException(message);
        }
    }
}
