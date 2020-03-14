package se.ifmo.web.model;

import javax.faces.view.ViewScoped;
import javax.inject.Named;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

@Named(value = "date")
@ViewScoped
public class DateBean implements Serializable {
    private SimpleDateFormat simpleDateFormat;
    private Date date;

    public DateBean() {
        simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        date = new Date();
    }

    public String getCurrentDate() {
        return simpleDateFormat.format(date);
    }

    public void updateDate() {
        date = new Date();
    }
}
