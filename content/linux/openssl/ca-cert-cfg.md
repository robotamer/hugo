+++
date = "2013-12-05T19:50:00Z"
description = "Creating Self-Signed SSL Certificate for Multiple Domains"
groups = ["linux"]
groups_weight = 56
keywords = ["linux", "ssl", "cert"]
linktitle = "CA Cert Cfg"
tags = ["linux", "ssl"]
title = "Self-Signed SSL Certificate with Config File"

+++

I automated this as much as I could.  

 1. Edit DOMAIN name in the ca.cfg
 2. Run the openssl command
 3. chmod the key file

#### Code to execute:  

	DOMAIN=robotamer.com  
	openssl req -new -x509 -nodes -out $DOMAIN_.crt -config ca.cfg
	chmod 600 DOMAIN_.key


#### TODO:

 * Still have to figure out how to get the global `DOMAIN` var in to the config file.  



#### Sample Config File:  

Save as `ca.cfg`

```bash

# Specify the domain
DOMAIN = robotamer.com

#####################################################

[ ca ]
default_ca              = CA_default


[ CA_default ]
DIR                     = .
serial                  = ${DIR}/serial
database                = ${DIR}/index.txt
new_certs_dir           = ${DIR}/newcerts
certs                   = ${DIR}/certs
certificate             = $certs/cacert.pem
private_key             = ${DIR}/private/cakey.pem
default_days            = 3650
default_md              = sha1
preserve                = no
email_in_dn             = no
nameopt                 = default_ca
certopt                 = default_ca
policy                  = policy_match
copy_extensions         = copy


[ policy_match ]
countryName             = match
stateOrProvinceName     = match
organizationName        = match
organizationalUnitName  = optional
commonName              = supplied
emailAddress            = optional


[ req ]
default_bits            = 2048                  # Size of keys
default_keyfile         = ${DOMAIN}_.key        # name of generated keys
default_md              = sha1                  # message digest algorithm
string_mask             = nombstr               # permitted characters
distinguished_name      = req_distinguished_name
req_extensions          = v3_req
x509_extensions         = v3_req


[ req_distinguished_name ]
# Variable name           Prompt string
#----------------------   ----------------------------------
0.organizationName      = Organization Name (company)
organizationalUnitName  = Organizational Unit Name (department, division)
emailAddress            = Email Address
emailAddress_max        = 40
localityName            = Locality Name (city, district)
stateOrProvinceName     = State or Province Name (full name)
countryName             = Country Name (2 letter code)
countryName_min         = 2
countryName_max         = 2
commonName              = Common Name (hostname, IP, or your name)
commonName_max          = 64

# Default values.
#------------------------------   ------------------------------
commonName_default              = *.${DOMAIN}
0.organizationName_default      = ${DOMAIN}
organizationalUnitName_default  = IT
localityName_default            = Los Angeles
stateOrProvinceName_default     = California
countryName_default             = US
emailAddress_default            = webmaster@${DOMAIN}

[alt_names]
DNS.1     = www.${DOMAIN}
DNS.2     = ${DOMAIN}
# DNS.3   = www.example.com
# DNS.4   = example.com


[ v3_ca ]
basicConstraints        = CA:TRUE
subjectKeyIdentifier    = hash
authorityKeyIdentifier  = keyid:always,issuer:always


[ v3_req ]
# Extensions to add to a certificate request
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment


# Some CAs do not yet support subjectAltName in CSRs.
# Instead the additional names are form entries on web
# pages where one requests the certificate...
subjectAltName          = @alt_names


[ server ]
# Make a cert with nsCertType set to "server"
basicConstraints=CA:FALSE
nsCertType                      = server
nsComment                       = "OpenSSL Generated Server Certificate"
subjectKeyIdentifier=hash
authorityKeyIdentifier=keyid,issuer:always


[ client ]
# Make a cert with nsCertType set to "client"
basicConstraints=CA:FALSE
nsCertType                      = client
nsComment                       = "OpenSSL Generated Client Certificate"
subjectKeyIdentifier=hash
authorityKeyIdentifier=keyid,issuer:always


```