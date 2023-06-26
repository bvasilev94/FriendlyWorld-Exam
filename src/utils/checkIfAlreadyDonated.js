exports.checkDonationStatus = (donators, userId) => {
    let hasDonated = false;
    donators.forEach((donation, id) => {
      if (donation.donatorId.toString() === userId) {
        hasDonated = true;
      }
    });
  
    return hasDonated;
  };
  