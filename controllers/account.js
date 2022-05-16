const pool = require("../db/connect");

const getInvoices = (req, res) => {
    const project_id = parseInt(req.query.project_id);
    const account_year_id = parseInt(req.query.account_year_id);
    // pool.query('select * from admin.schools_invoices where project_id = $1 and account_year_id = $2', [project_id, account_year_id],
    pool.query('select * from admin.invoices',
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
};

const getPaymentReports = (req, res) => {
    const project_id = parseInt(req.query.project_id);
    const { start_date, end_date } = req.query;
    pool.query("select * from admin.payment_report where project_id = $1 and payment_date between $2 and $3", [project_id, start_date, end_date],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
};

const viewReceipt = (req, res) => {
    const invoice_id = parseInt(req.query.invoice_id);
    const payment_id = parseInt(req.query.payment_id);
    if (invoice_id > 0) {
        pool.query("select i.id,f.amount,i.reference,i.date,i.token,c.username,c.name,c.phone,c.email,c.start_usage_date::date,p.amount as paid,i.due_date from admin.payments p join admin.invoices i on i.id = p.invoice_id join admin.clients c on c.id = i.client_id join admin.invoice_fees f on f.invoice_id = i.id where p.id = $1 and i.id = $2", [payment_id, invoice_id],
            (error, results) => {
                if (error) {
                    throw error;
                }
                first_ = new Date(new Date().getFullYear(), 0, 1);
                start_usage_date = results.rows[0].start_usage_date === "" ? first_ : results.rows[0].start_usage_date;
                yearEnd = new Date(new Date().getFullYear(), 11, 31);
                to = yearEnd.toISOString().split("T")[0];
                from = start_usage_date.toISOString().split("T")[0];

                const data = {
                    set: 1,
                    receipt: results.rows[0],
                    dates: {
                        from_date: from,
                        to_date: to,
                    }
                };

                res.status(200).json(data);
            }
        );
    } else {
        res.status(200).json([]);
    }
};


module.exports = {
    getInvoices,
    getPaymentReports,
    viewReceipt,
};