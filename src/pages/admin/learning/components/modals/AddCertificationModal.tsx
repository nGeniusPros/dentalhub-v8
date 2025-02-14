import React, { useState } from 'react';

interface Certification {
  name: string;
  issuer: string;
  dateIssued: string;
  expirationDate: string;
  requirements: string[];
}

const AddCertificationModal: React.FC = () => {
  const [certification] = useState<Certification>({
    name: '',
    issuer: '',
    dateIssued: '',
    expirationDate: '',
    requirements: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCertification = {
      ...certification,
      credentialId: `CERT-${Date.now().toString()}`,
    };
    console.log(newCertification);
  };

  return (
    <div>
      <h1>Add Certification</h1>
      <form onSubmit={handleSubmit}>
        {/* Certification form fields */}
        <button type="submit">Add Certification</button>
      </form>
    </div>
  );
};

export default AddCertificationModal;