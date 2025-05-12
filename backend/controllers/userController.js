const User = require('../models/User');

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password -resetPasswordToken -resetPasswordExpires -verificationToken -mfaSecret');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user.toProfileJSON());
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateMyProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['firstName', 'lastName', 'email', 'bio', 'location', 'profileImage', 'skills', 'experience', 'education'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ msg: 'Invalid updates!' });
  }

  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    updates.forEach(update => {
      if (update === 'skills' && Array.isArray(req.body.skills)) {
        user.skills = [...new Set([...user.skills, ...req.body.skills])]; // Merge and remove duplicates
      } else if (update === 'experience' && Array.isArray(req.body.experience)) {
        user.experience = req.body.experience;
      } else if (update === 'education' && Array.isArray(req.body.education)) {
        user.education = req.body.education;
      } else {
        user[update] = req.body[update];
      }
    });
    
    await user.save();
    res.json(user.toProfileJSON());
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getUserProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password -resetPasswordToken -resetPasswordExpires -verificationToken -mfaSecret -email -roles');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user.toProfileJSON());
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server error');
  }
};