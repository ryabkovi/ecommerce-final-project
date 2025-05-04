export function orderConfirmationEmail({
  userName,
  orderNumber,
  totalPrice,
  products,
}) {
  const productList = (products || [])
    .map((item) => {
      const name = item.productId?.product_name || "מוצר לא ידוע";
      const quantity = item.quantity || 1;
      return `<li>${name} - כמות: ${quantity}</li>`;
    })
    .join("");

  return `
    <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://your-logo-url.com/logo.png" alt="clickSHOP" style="max-width: 180px;" />
      </div>
      <h2 style="text-align: center;">תודה על הזמנתך ב־clickSHOP!</h2>
      <p>שלום ${userName},</p>
      <p>הזמנתך התקבלה בהצלחה. מספר ההזמנה שלך הוא <strong>#${orderNumber}</strong>.</p>

      <h3>פרטי ההזמנה:</h3>
      <ul style="list-style: none; padding: 0;">
        ${productList}
      </ul>

      <p>סכום כולל: <strong>₪${Number(totalPrice).toFixed(2)}</strong></p>

      <p style="margin-top: 20px;">נשלח אליך עדכון נוסף כשהזמנתך תשתנה.</p>

      <div style="margin-top: 30px; text-align: center;">
        <small>כל הזכויות שמורות © clickSHOP</small>
      </div>
    </div>
  `;
}

export function orderStatusUpdateEmail({ userName, orderNumber, newStatus }) {
  return `
    <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://your-logo-url.com/logo.png" alt="clickSHOP" style="max-width: 180px;" />
      </div>
      <h2 style="text-align: center;">עדכון הזמנה ב־clickSHOP</h2>
      <p>שלום ${userName},</p>
      <p>סטטוס ההזמנה שלך (<strong>#${orderNumber}</strong>) עודכן ל: <strong>${newStatus}</strong>.</p>

      <p style="margin-top: 20px;">תודה שהזמנת מ־clickSHOP!</p>

      <div style="margin-top: 30px; text-align: center;">
        <small>כל הזכויות שמורות © clickSHOP</small>
      </div>
    </div>
  `;
}
