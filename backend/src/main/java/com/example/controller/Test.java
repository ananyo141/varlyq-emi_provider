package com.example.controller;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.androiddeviceprovisioning.v1.AndroidProvisioningPartner;
import com.google.api.services.androiddeviceprovisioning.v1.model.Configuration;
import com.google.api.services.androidmanagement.v1.AndroidManagement;
import com.google.api.services.androidmanagement.v1.model.*;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Path("/test")
public class Test {

    private static final String OAUTH_SCOPE =
            "https://www.googleapis.com/auth/androidmanagement";

    private static final String APP_NAME = "Android Management API sample app";

    @GET
    public void test() throws GeneralSecurityException, IOException {
        AndroidManagement androidManagement = getAndroidManagementClient();
        String name = createEnterprise(androidManagement);



        Policy policy = new Policy();
        policy.setFactoryResetDisabled(true);
        policy.setSafeBootDisabled(true);
        PolicyEnforcementRule policyEnforcementRule=new PolicyEnforcementRule();
        policyEnforcementRule.setSettingName("policyEnforcementRules");
        WipeAction wipeAction=new WipeAction();
        wipeAction.setPreserveFrp(true);
        wipeAction.setWipeAfterDays(1);

        policyEnforcementRule.setWipeAction(wipeAction);

        BlockAction blockAction=new BlockAction();
        blockAction.setBlockScope("BLOCK_SCOPE_DEVICE") ;
        blockAction.setBlockAfterDays(0);
        policyEnforcementRule.setBlockAction(blockAction);
        List<PolicyEnforcementRule> policyEnforcementRules=new ArrayList<>();
        policyEnforcementRules.add(policyEnforcementRule);
        policy.setPolicyEnforcementRules(policyEnforcementRules);
        List<String> adminMail= new ArrayList<>();
        adminMail.add("admin@softkitesinfo.com");
        policy.setFrpAdminEmails(adminMail);
        policy.setUsbFileTransferDisabled(false);
        policy.setDebuggingFeaturesAllowed(true);

        AdvancedSecurityOverrides advancedSecurityOverrides=new AdvancedSecurityOverrides();
        advancedSecurityOverrides.setDeveloperSettings("DEVELOPER_SETTINGS_ALLOWED");
        policy.setAdvancedSecurityOverrides(advancedSecurityOverrides);


////        System.out.println(androidManagement.enterprises().policies().get("enterprises/LC02rbh7iw/policies/policy").execute().getName());
////        String patchName=androidManagement.enterprises().policies().patch("enterprises/LC02rbh7iw/policies/policy", policy).execute().getName();
//        List<Policy> policies=androidManagement.enterprises().policies().list("enterprises/LC02rbh7iw").execute().getPolicies();
////       androidManagement.enterprises().policies().get("policy").execute().getName();
//        policies.forEach(o -> {
//           System.out.println(o.getName());
//       });
//        System.out.println(policies);
//
//        System.out.println(name);
//        System.out.println(patchName);

        System.out.println(androidManagement.enterprises().policies().patch("enterprises/LC02rbh7iw/policies/policy4",policy).execute().getName());


//        EnrollmentToken enrollmentToken=new EnrollmentToken();
//        enrollmentToken.setPolicyName("enterprises/LC02rbh7iw/policies/policy4");
//        enrollmentToken.setAllowPersonalUsage("PERSONAL_USAGE_DISALLOWED");
//        System.out.println(androidManagement.enterprises().enrollmentTokens().create("enterprises/LC02rbh7iw",enrollmentToken).execute().getQrCode());

//        androidManagement.enterprises().devices().list("enterprises/LC02rbh7iw").execute().getDevices().forEach(device -> {
//            System.out.println(device.getOwnership());
//            System.out.println(device.getName());
//            System.out.println(device.getPolicyName());
//            System.out.println(device.getManagementMode());
//        });


       ///////////////////////////////////////


    }

    private static AndroidManagement getAndroidManagementClient()
            throws IOException, GeneralSecurityException {
        try (FileInputStream input =
                     new FileInputStream(Thread.currentThread().getContextClassLoader().getResource("service.json").getFile())) {
            GoogleCredential credential =
                    GoogleCredential.fromStream(input)
                            .createScoped(Collections.singleton(OAUTH_SCOPE));
            return new AndroidManagement.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    JacksonFactory.getDefaultInstance(),
                    credential)
                    .setApplicationName(APP_NAME)
                    .build();
        }
    }

//    public static Credential authorize() throws IOException {
//        // Load client secrets.
//        InputStream in =
//                CustomerQuickstart.class.getResourceAsStream("/client_secret.json");
//
//        GoogleClientSecrets clientSecrets =
//                GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in, "UTF-8"));
//
//        // Ask the user to authorize the request using their Google Account
//        // in their browser.
//        GoogleAuthorizationCodeFlow flow =
//                new GoogleAuthorizationCodeFlow.Builder(
//                        HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
//                        .setDataStoreFactory(DATA_STORE_FACTORY)
//                        .setAccessType("offline")
//                        .build();
//        Credential credential = new AuthorizationCodeInstalledApp(
//                flow, new LocalServerReceiver()).authorize("user");
//        System.out.println(
//                "Credential file saved to: " + DATA_STORE_DIR.getAbsolutePath());
//        return credential;
//    }

//    public static AndroidProvisioningPartner getService() throws IOException {
//        Credential credential = authorize();
//        return new AndroidProvisioningPartner.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
//                .setApplicationName(APP_NAME)
//                .build();
//    }



    private String createEnterprise(AndroidManagement androidManagementClient)
            throws IOException {
        ContactInfo contactInfo = new ContactInfo();
        contactInfo.setContactEmail("softkitesinfo@gmail.com");
        contactInfo.setDataProtectionOfficerName("Ashutosh Dangi");
        contactInfo.setDataProtectionOfficerEmail("softkitesinfo@gamil.com");
        contactInfo.setDataProtectionOfficerPhone("+919630020141");
        contactInfo.setEuRepresentativeName("Ashutosh Dangi");
        contactInfo.setEuRepresentativeEmail("softkitesinfo@gmail.com");
        contactInfo.setEuRepresentativePhone("+919630020141");

        Enterprise enterprise = new Enterprise();
        enterprise.setEnterpriseDisplayName("Example Enterprise");
        enterprise.setContactInfo(contactInfo);
        Enterprise enterprises =
                androidManagementClient
                        .enterprises()
                        .create(enterprise)
                        .setProjectId("emi-provider")
                        .setAgreementAccepted(true)
                        .execute();


        return enterprises.getName();
    }


}
