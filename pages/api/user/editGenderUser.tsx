import { withIronSessionApiRoute } from "iron-session/next";
import prisma from "../../../lib/prisma";
import { validationBody } from "../../../lib/validation";
import validator from "validator";

export default withIronSessionApiRoute(
  async function editGenderUser(req, res) {
    if (req.method === "POST") {
      if (req.session.user) {
        const { genre, pseudo } = await req.body;
        let arrayMessageError = validationBody(req.body);
        if (arrayMessageError.length > 0) {
          return res.status(400).json({
            status: 400,
            message: arrayMessageError,
          });
        }
        if (pseudo.trim() !== "") {
          return res.status(404).json({
            status: 404,
            message:
              "Une erreur est survenue lors de l'envoie du message, veuillez réessayer plus tard",
          });
        } else {
          let user = await prisma.user.findUnique({
            where: { id: req.session.user.id },
          });
          if (user === null) {
            return res.status(400).json({
              status: 400,
              message: "L'utilisateur n'as pas été trouvé, veuillez réessayer",
            });
          } else {
            let editUser = await prisma.user.update({
              where: {
                id: req.session.user.id,
              },
              data: {
                genre: validator.escape(genre.trim()),
              },
            });
            let userObject = {
              id: editUser.id,
              firstname: editUser.firstname,
              lastname: editUser.lastname,
              email: editUser.mail,
              role: editUser.role,
              phone: editUser.phone,
              birth: editUser.birth,
              genre: editUser.genre,
            };
            console.log(userObject);
            res.status(200).json({
              status: 200,
              message: "Votre genre a été mis à jours avec succès",
              body: userObject,
            });
          }
        }
      } else {
        return res.status(404).json({
          status: 404,
          message: "Vous n'êtes pas connecté, veuillez réessayer",
        });
      }
    } else {
      return res.status(404).json({
        status: 404,
        message: "Une erreur est survenue, veuillez réessayer",
      });
    }
  },
  {
    password:
      "tesdfjklsjtesdfjktesdfjklsjdfljslkdfjlsjdflslqfdjkstlsjdfljslkdfjlsjdflslqfdjkstdfljslkdfjlsjdflslqfdjkst",
    cookieName: "test",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
