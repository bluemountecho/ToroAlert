const LeaseModel = require("../../api/models/lease");
const AlgorithmModel = require("../../api/models/algorithm");

const { CustomError } = require("../../api/utils/error-handlers");
const { sanitize } = require("../../api/utils/data-handlers");

const allowedLeaseStatus = ["approved", "rejected"];

const getLeaseStatusData = async (req, res) => {
  try {
    const pendingLeaseObjects = await LeaseModel.find(
      { status: "pending" },
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    );
    res.status(200).json({ success: true, leaseObjects: pendingLeaseObjects });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to submit algorithm for back test, please try again. If problem persists contact admin",
    });
  }
};

const postLeaseStatusData = async (req, res) => {
  try {
    const leaseStatusObjectId = sanitize(req.body.leaseStatusObjectId);
    const status = sanitize(req.body.status);

    if (!allowedLeaseStatus.includes(status)) {
      throw new CustomError("status not allowed");
    }

    const leaseStatus = await LeaseModel.findOneAndUpdate(
      {
        _id: leaseStatusObjectId,
      },
      {
        $set: {
          status: status,
        },
      },
      {
        runValidators: true,
        new: false,
      }
    );

    if (!leaseStatus) {
      throw new CustomError("No lease status found against this object Id");
    }
    const { algorithm, algorithmVersion } = leaseStatus;
    const { matchedCount, modifiedCount } = await AlgorithmModel.updateOne(
      { _id: algorithm, version: algorithmVersion },
      {
        $set: {
          "leaseStatus.approved": status === "approved" ? true : false,
          status: status,
          public: status === "approved" ? true : false,
        },
      },
      { runValidators: true }
    );
    if (matchedCount !== 1 || modifiedCount !== 1) {
      throw new CustomError(
        "Lease status updated, failed to update algrithm/version changed"
      );
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        err.type === "custom_err"
          ? err.message
          : "Failed to submit algorithm for back test, please try again. If problem persists contact admin",
    });
  }
};

module.exports = { getLeaseStatusData, postLeaseStatusData };
