const { insurance } = require("../../models");

exports.createInsurance = async (req, res) => {
  try {
    const dataInsurace = await insurance.create({
      ...req.body,
    });
    res.status(200).send({
      status: "success",
      data: dataInsurace,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getInsurances = async (req, res) => {
  try {
    let dataInsurace = await insurance.findAll({});
    res.status(200).send({
      status: "success",
      data: dataInsurace,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getInsuranceDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const dataInsurance = await insurance.findOne({
      where: { id },
    });

    if (!dataInsurance) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    res.status(200).send({
      status: "success",
      data: dataInsurance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteInsurance = async (req, res) => {
  try {
    const id = req.params.id;

    const findInsurance = await insurance.findOne({ where: { id } });

    if (!findInsurance) {
      return res.send({
        status: "failed",
        message: "Data not found",
      });
    }

    await insurance.destroy({ where: { id } });

    res.status(200).send({
      status: "success",
      data: { id: findInsurance.id },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updateInsurance = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const findUser = await insurance.findOne({ where: { id } });

    if (!findUser) {
      return res.send({
        status: "Error",
        message: "User doesn't exist",
      });
    }

    const dataUpdated = {
      ...body,
    };

    await insurance.update(dataUpdated, {
      where: { id },
    });

    const updateUser = await insurance.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["updatedAt", "createdAt", "password"],
      },
    });
    console.log(updateUser),
      res.status(200).send({
        status: "success",
        data: { user: updateUser },
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
