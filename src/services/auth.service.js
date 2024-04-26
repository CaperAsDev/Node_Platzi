import  boom from '@hapi/boom';
import  bcrypt from 'bcrypt';
import  jwt from 'jsonwebtoken';
import  nodemailer from 'nodemailer';

import  { config } from './../config/config.js';
import  UserService from './user.service.js';

const service = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();;
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  }

  verifyToken (token) {
    return jwt.verify(token, config.jwtSecret)
  }

  async hashPassword(myPassword) {
    const hash = await bcrypt.hash(myPassword, 10);
    return hash
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;// this should be replaced
    await service.update(user.id, {recoveryToken: token});
    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link}</b>`,
    }
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      }
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }

  async changePassword (token, newPassword) {
    try {
      const payload = this.verifyToken(token)
      const user = await service.findOne(payload.sub)
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await this.hashPassword(newPassword)
      await service.update(user.id, { recoveryToken: null, password: hash });
      return {message: 'Password updated successfully'}
    } catch (error) {
      throw boom.unauthorized()
    }
  }
}

export default AuthService
