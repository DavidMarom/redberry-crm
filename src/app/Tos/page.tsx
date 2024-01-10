"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Divider } from "@nextui-org/react";

//Tos stands for Terms of service
const Tos = () => {
  return (
    <div>
      <h1>Terms of Service</h1>
      <Divider></Divider>
      <h2>• Acceptance of Terms</h2>
      By accessing or using the Redberry CRM services ("Service"), you agree to comply with and be bound by these Terms of Service ("Terms"). <br/>
      If you do not agree to these Terms, please do not use the Service.
      <h2>• Description of Service</h2>
      The Redberry CRM service provides a user-friendly customer relationship management platform for managing contacts, leads, and basic sales activities. <br/>
      The Service may include updates, new features, and enhancements.
      <h2>• User Accounts</h2>
      To access the Service, you must create an account. You are responsible for maintaining the confidentiality of your account information and are fully responsible for all activities that occur under your account. <br/>
      You agree to notify us immediately of any unauthorized use of your account.
      <h2>• User Responsibilities</h2>
      <span>
      You agree to use the Service in compliance with all applicable laws and regulations. You will not:
      </span><br/>
    <b>1.</b> Violate any intellectual property rights. <br/>
    <b>2.</b> Upload, transmit, or distribute any content that is unlawful, harmful, threatening, or abusive. <br/>
    <b>3.</b> Use the Service for any unauthorized or illegal purpose. 
    <h2>• Data Privacy</h2>
    We respect your privacy. Our Privacy Policy outlines how we collect, use, and safeguard your information. By using the Service, you agree to our Privacy Policy.
    <h2>• Intellectual Property</h2>
    The Redberry CRM service, including but not limited to software, logos, and trademarks, is the property of Redberry CRM. <br/>
    You agree not to reproduce, distribute, or create derivative works without our written permission.
    <h2>• Limitation of Liability</h2>
    In no event shall Redberry CRM be liable for any indirect, incidental, special, consequential, <br/>
    or punitive damages arising out of or in connection with the use of the Service.
    <h2>• Termination</h2>
    We reserve the right to suspend or terminate your access to the Service at any time for any reason. <br/>
    You may terminate your account by following the instructions on the Service. <br/>
    Upon termination, all rights granted to you will cease.
    <h2>• Changes to Terms</h2>
    We may modify these Terms at any time. The updated Terms will be posted on the Service, <br/>
    and your continued use constitutes acceptance of the changes.
    </div>
  );
};

export default Tos;
