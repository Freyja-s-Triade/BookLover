// Cette fonction exécute la méthode d'un controller et fait un try catch à sa place

export default function catchErrors(controllerMethod) {
  return async function (req, res, next) {
    try {
      await controllerMethod(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
s;
