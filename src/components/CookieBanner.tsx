"use client";
import CookieConsent from "react-cookie-consent";
export default function CookieBanner() {
    return(<CookieConsent location="bottom" buttonText="Accept" style={{
        background:"#1a1a1a"}} buttonStyle={{background:"#ffffff", color:"#000", fontSize:"13px", borderRadius:"6px"}}>This website uses cookies to enhance your experience</CookieConsent>
    );}
    