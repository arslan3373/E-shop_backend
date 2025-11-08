// Order Confirmation Email Template
export const orderConfirmationTemplate = (order, user) => {
  const orderItemsHTML = order.orderItems.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Order Confirmed! 🎉</h1>
      </div>
      
      <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; margin-bottom: 20px;">Hi <strong>${user.name}</strong>,</p>
        
        <p style="font-size: 16px; margin-bottom: 20px;">Thank you for your order! We're excited to get your items to you.</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #0ea5e9; margin-top: 0;">Order Details</h2>
          <p><strong>Order ID:</strong> #${order._id.toString().slice(-8).toUpperCase()}</p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p><strong>Status:</strong> <span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 12px; font-size: 14px;">${order.status}</span></p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #0ea5e9; margin-top: 0;">Items Ordered</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f3f4f6;">
                <th style="padding: 10px; text-align: left;">Image</th>
                <th style="padding: 10px; text-align: left;">Product</th>
                <th style="padding: 10px; text-align: center;">Qty</th>
                <th style="padding: 10px; text-align: right;">Price</th>
                <th style="padding: 10px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderItemsHTML}
            </tbody>
          </table>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #0ea5e9; margin-top: 0;">Shipping Address</h2>
          <p style="margin: 5px 0;">${order.shippingAddress.street}</p>
          <p style="margin: 5px 0;">${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}</p>
          <p style="margin: 5px 0;">${order.shippingAddress.country}</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> ${order.shippingAddress.phone}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #0ea5e9; margin-top: 0;">Order Summary</h2>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 8px 0;">Subtotal:</td>
              <td style="padding: 8px 0; text-align: right;">$${order.itemsPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">Shipping:</td>
              <td style="padding: 8px 0; text-align: right;">$${order.shippingPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">Tax:</td>
              <td style="padding: 8px 0; text-align: right;">$${order.taxPrice.toFixed(2)}</td>
            </tr>
            <tr style="border-top: 2px solid #0ea5e9;">
              <td style="padding: 12px 0; font-size: 18px; font-weight: bold;">Total:</td>
              <td style="padding: 12px 0; text-align: right; font-size: 18px; font-weight: bold; color: #0ea5e9;">$${order.totalPrice.toFixed(2)}</td>
            </tr>
          </table>
          <p style="margin-top: 15px;"><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/orders/${order._id}" style="background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Track Your Order</a>
        </div>
        
        <p style="margin-top: 30px; font-size: 14px; color: #6b7280; text-align: center;">
          If you have any questions, please contact us at <a href="mailto:${process.env.ADMIN_EMAIL}" style="color: #0ea5e9;">${process.env.ADMIN_EMAIL}</a>
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
        <p>© 2024 E-Shop. All rights reserved.</p>
        <p>This email was sent to ${user.email}</p>
      </div>
    </body>
    </html>
  `;
};

// Order Status Update Email Template
export const orderStatusUpdateTemplate = (order, user, oldStatus) => {
  const statusColors = {
    'Pending': '#fef3c7',
    'Processing': '#dbeafe',
    'Shipped': '#e0e7ff',
    'Delivered': '#d1fae5',
    'Cancelled': '#fee2e2'
  };

  const statusTextColors = {
    'Pending': '#92400e',
    'Processing': '#1e40af',
    'Shipped': '#5b21b6',
    'Delivered': '#065f46',
    'Cancelled': '#991b1b'
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Status Update</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Order Status Updated 📦</h1>
      </div>
      
      <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; margin-bottom: 20px;">Hi <strong>${user.name}</strong>,</p>
        
        <p style="font-size: 16px; margin-bottom: 20px;">Your order status has been updated!</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #0ea5e9; margin-top: 0;">Order #${order._id.toString().slice(-8).toUpperCase()}</h2>
          <div style="margin: 20px 0;">
            <p style="margin-bottom: 10px;">Status changed from:</p>
            <div style="display: inline-block; background: ${statusColors[oldStatus]}; color: ${statusTextColors[oldStatus]}; padding: 8px 16px; border-radius: 12px; font-weight: bold; margin-right: 10px;">
              ${oldStatus}
            </div>
            <span style="font-size: 20px;">→</span>
            <div style="display: inline-block; background: ${statusColors[order.status]}; color: ${statusTextColors[order.status]}; padding: 8px 16px; border-radius: 12px; font-weight: bold; margin-left: 10px;">
              ${order.status}
            </div>
          </div>
        </div>
        
        ${order.status === 'Shipped' ? `
          <div style="background: #dbeafe; border-left: 4px solid #0ea5e9; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
            <p style="margin: 0; font-weight: bold; color: #1e40af;">🚚 Your order is on its way!</p>
            <p style="margin: 5px 0 0 0; color: #1e40af;">Expected delivery: 5-7 business days</p>
          </div>
        ` : ''}
        
        ${order.status === 'Delivered' ? `
          <div style="background: #d1fae5; border-left: 4px solid #10b981; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
            <p style="margin: 0; font-weight: bold; color: #065f46;">✅ Your order has been delivered!</p>
            <p style="margin: 5px 0 0 0; color: #065f46;">We hope you enjoy your purchase!</p>
          </div>
        ` : ''}
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/orders/${order._id}" style="background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">View Order Details</a>
        </div>
        
        <p style="margin-top: 30px; font-size: 14px; color: #6b7280; text-align: center;">
          Questions? Contact us at <a href="mailto:${process.env.ADMIN_EMAIL}" style="color: #0ea5e9;">${process.env.ADMIN_EMAIL}</a>
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
        <p>© 2024 E-Shop. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
};

// Admin New Order Notification
export const adminNewOrderTemplate = (order, user) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Order Received</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #1f2937; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">🛍️ New Order Received</h1>
      </div>
      
      <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #0ea5e9;">Order #${order._id.toString().slice(-8).toUpperCase()}</h2>
        
        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
          <h3 style="margin-top: 0;">Customer Information</h3>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Phone:</strong> ${order.shippingAddress.phone}</p>
        </div>
        
        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
          <h3 style="margin-top: 0;">Order Summary</h3>
          <p><strong>Items:</strong> ${order.orderItems.length}</p>
          <p><strong>Total:</strong> $${order.totalPrice.toFixed(2)}</p>
          <p><strong>Payment:</strong> ${order.paymentMethod}</p>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/orders" style="background: #1f2937; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View in Admin Panel</a>
        </div>
      </div>
    </body>
    </html>
  `;
};
