export const findOneMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'any_password',
};

export const validLoginResponse = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY2NzUzMTM2LCJleHAiOjE2NjczNTc5MzZ9.iU9FU2S5oDPX1a6YLcGcsNciA4Ljgdf7qCHThhZTVhY'
};

export const invalidLoginResponse = {
  message: 'Incorrect email or password',
}

export const validLoginMock = {
  email: 'admin@admin.com',
  password: 'any_password',
};

export const noEmailMock = {
  password: 'any_password',
};

export const noPasswordMock = {
  email: 'admin@admin.com',
};

export const joiResponseMock = {
  error: { message: 'All fields must be filled' },
};

export const invalidTokenMock = {
  message: 'Token must be a valid token',
};
