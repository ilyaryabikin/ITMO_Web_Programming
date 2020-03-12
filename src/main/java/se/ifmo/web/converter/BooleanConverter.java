package se.ifmo.web.converter;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.ConverterException;
import javax.faces.convert.FacesConverter;

@FacesConverter("booleanConverter")
public class BooleanConverter implements Converter {
    @Override
    public Object getAsObject(FacesContext facesContext, UIComponent uiComponent, String s) {
        boolean bool = Boolean.parseBoolean(s);
        return bool;
    }

    @Override
    public String getAsString(FacesContext context, UIComponent component, Object value) throws ConverterException {
        boolean bool = Boolean.parseBoolean(value.toString());
        if (bool) {
            return "Да";
        }
        else {
            return "Нет";
        }
    }
}
