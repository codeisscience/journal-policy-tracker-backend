const forgotPasswordEmailTemplate = (
  forgotPasswordURL,
  logoURL,
  displayImageURL,
  codeIsScienceURL
) => {
  return `
		<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
	xmlns:o="urn:schemas-microsoft-com:office:office">

<head>

	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Reset Your Password</title>

	<link href='https://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic' rel='stylesheet'
		type='text/css'>

	<style type="text/css">
		@media only screen and (min-width:768px) {
			.templateContainer {
				width: 600px !important;
			}

		}

		@media only screen and (max-width: 480px) {

			body,
			table,
			td,
			p,
			a,
			li,
			blockquote {
				-webkit-text-size-adjust: none !important;
			}

		}

		@media only screen and (max-width: 480px) {
			body {
				width: 100% !important;
				min-width: 100% !important;
			}

		}

		@media only screen and (max-width: 480px) {
			#bodyCell {
				padding-top: 10px !important;
			}

		}

		@media only screen and (max-width: 480px) {
			.mcnImage {
				width: 100% !important;
			}

		}

		@media only screen and (max-width: 480px) {

			.mcnCaptionTopContent,
			.mcnCaptionBottomContent,
			.mcnTextContentContainer,
			.mcnBoxedTextContentContainer,
			.mcnImageGroupContentContainer,
			.mcnCaptionLeftTextContentContainer,
			.mcnCaptionRightTextContentContainer,
			.mcnCaptionLeftImageContentContainer,
			.mcnCaptionRightImageContentContainer,
			.mcnImageCardLeftTextContentContainer,
			.mcnImageCardRightTextContentContainer {
				max-width: 100% !important;
				width: 100% !important;
			}

		}

		@media only screen and (max-width: 480px) {
			.mcnBoxedTextContentContainer {
				min-width: 100% !important;
			}

		}

		@media only screen and (max-width: 480px) {
			.mcnImageGroupContent {
				padding: 9px !important;
			}

		}

		@media only screen and (max-width: 480px) {

			.mcnCaptionLeftContentOuter .mcnTextContent,
			.mcnCaptionRightContentOuter .mcnTextContent {
				padding-top: 9px !important;
			}

		}

		@media only screen and (max-width: 480px) {

			.mcnImageCardTopImageContent,
			.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent {
				padding-top: 18px !important;
			}

		}

		@media only screen and (max-width: 480px) {
			.mcnImageCardBottomImageContent {
				padding-bottom: 9px !important;
			}

		}

		@media only screen and (max-width: 480px) {
			.mcnImageGroupBlockInner {
				padding-top: 0 !important;
				padding-bottom: 0 !important;
			}

		}

		@media only screen and (max-width: 480px) {
			.mcnImageGroupBlockOuter {
				padding-top: 9px !important;
				padding-bottom: 9px !important;
			}

		}

		@media only screen and (max-width: 480px) {

			.mcnTextContent,
			.mcnBoxedTextContentColumn {
				padding-right: 18px !important;
				padding-left: 18px !important;
			}

		}

		@media only screen and (max-width: 480px) {

			.mcnImageCardLeftImageContent,
			.mcnImageCardRightImageContent {
				padding-right: 18px !important;
				padding-bottom: 0 !important;
				padding-left: 18px !important;
			}

		}

		@media only screen and (max-width: 480px) {
			.mcpreview-image-uploader {
				display: none !important;
				width: 100% !important;
			}

		}

		@media only screen and (max-width: 480px) {

			/*
      @tab Mobile Styles
      @section Heading 1
      @tip Make the first-level headings larger in size for better readability
   on small screens.
      */
			h1 {
				/*@editable*/
				font-size: 20px !important;
				/*@editable*/
				line-height: 150% !important;
			}

		}

		@media only screen and (max-width: 480px) {

			/*
      @tab Mobile Styles
      @section Heading 2
      @tip Make the second-level headings larger in size for better
   readability on small screens.
      */
			h2 {
				/*@editable*/
				font-size: 20px !important;
				/*@editable*/
				line-height: 150% !important;
			}

		}

		@media only screen and (max-width: 480px) {

			/*
      @tab Mobile Styles
      @section Heading 3
      @tip Make the third-level headings larger in size for better readability
   on small screens.
      */
			h3 {
				/*@editable*/
				font-size: 18px !important;
				/*@editable*/
				line-height: 150% !important;
			}

		}

		@media only screen and (max-width: 480px) {

			/*
      @tab Mobile Styles
      @section Heading 4
      @tip Make the fourth-level headings larger in size for better
   readability on small screens.
      */
			h4 {
				/*@editable*/
				font-size: 16px !important;
				/*@editable*/
				line-height: 150% !important;
			}

		}

		@media only screen and (max-width: 480px) {

			/*
      @tab Mobile Styles
      @section Boxed Text
      @tip Make the boxed text larger in size for better readability on small
   screens. We recommend a font size of at least 16px.
      */
			.mcnBoxedTextContentContainer .mcnTextContent,
			.mcnBoxedTextContentContainer .mcnTextContent p {
				/*@editable*/
				font-size: 16px !important;
				/*@editable*/
				line-height: 150% !important;
			}

		}

		@media only screen and (max-width: 480px) {

			/*
      @tab Mobile Styles
      @section Preheader Visibility
      @tip Set the visibility of the email's preheader on small screens. You
   can hide it to save space.
      */
			#templatePreheader {
				/*@editable*/
				display: block !important;
			}

		}

		@media only screen and (max-width: 480px) {

			/*
      @tab Mobile Styles
      @section Preheader Text
      @tip Make the preheader text larger in size for better readability on
   small screens.
      */
			#templatePreheader .mcnTextContent,
			#templatePreheader .mcnTextContent p {
				/*@editable*/
				font-size: 12px !important;
				/*@editable*/
				line-height: 150% !important;
			}

		}

		@media only screen and (max-width: 480px) {

			/*
      @tab Mobile Styles
      @section Header Text
      @tip Make the header text larger in size for better readability on small
   screens.
      */
			#templateHeader .mcnTextContent,
			#templateHeader .mcnTextContent p {
				/*@editable*/
				font-size: 16px !important;
				/*@editable*/
				line-height: 150% !important;
			}

		}

		@media only screen and (max-width: 480px) {

			/*
      @tab Mobile Styles
      @section Body Text
      @tip Make the body text larger in size for better readability on small
   screens. We recommend a font size of at least 16px.
      */
			#templateBody .mcnTextContent,
			#templateBody .mcnTextContent p {
				/*@editable*/
				font-size: 16px !important;
				/*@editable*/
				line-height: 150% !important;
			}

		}

		@media only screen and (max-width: 480px) {

			/*
      @tab Mobile Styles
      @section Footer Text
      @tip Make the footer content text larger in size for better readability
   on small screens.
      */
			#templateFooter .mcnTextContent,
			#templateFooter .mcnTextContent p {
				/*@editable*/
				font-size: 12px !important;
				/*@editable*/
				line-height: 150% !important;
			}

		}
	</style>
</head>

<body style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 background-color: #e8ebed; height: 100%; margin: 0; padding: 0; width: 100%">
	<center>
		<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
 100%; background-color: #e8ebed; height: 100%; margin: 0; padding: 0; width:
 100%" width="100%">
			<tr>
				<td align="center" id="bodyCell" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0;
 height: 100%; margin: 0; padding: 0; width: 100%" valign="top">
					<!-- BEGIN TEMPLATE // -->
					<table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width:
 600px; border: 0" width="100%">
						<tr>
							<td id="templatePreheader" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #e8ebed;
 border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">
								<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 min-width:100%;" width="100%">
									<tbody class="mcnTextBlockOuter">
										<tr>
											<td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
												<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer"
													style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
 100%; min-width:100%;" width="100%">
													<tbody>
														<tr>
															<td class="mcnTextContent" style='mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
 color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 12px;
 line-height: 150%; text-align: left; padding-top:9px; padding-right: 18px;
 padding-bottom: 9px; padding-left: 18px;' valign="top">
																<a href="${codeIsScienceURL}" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;
 font-weight: normal; text-decoration: none" target="_blank"
																	title="CodeIsScience helps researchers find policy details for journal.">
																	<img align="none"
																		alt="CodeIsScience helps researchers find policy details for journal." height="48"
																		src="${logoURL}" style="-ms-interpolation-mode: bicubic; border: 0; outline: none;
text-decoration: none; height: auto; width: 200px; height: auto; margin: 0px;" width="126" />
																</a>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
						<tr>
							<td id="templateHeader" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #ffffff;
 border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">
								<table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 min-width:100%;" width="100%">
									<tbody class="mcnImageBlockOuter">
										<tr>
											<td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
												<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer"
													style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
 100%; min-width:100%;" width="100%">
													<tbody>
														<tr>
															<td class="mcnImageContent" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
 padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top">
																<a class="" href="${codeIsScienceURL}" style="mso-line-height-rule:
 exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
 #f84b4b; font-weight: normal; text-decoration: none" target="_blank" title="">
																	<a class="" href="${codeIsScienceURL}" style="mso-line-height-rule:
 exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
 #f84b4b; font-weight: normal; text-decoration: none" target="_blank" title="">
																		<img align="center" alt="Forgot your password?" class="mcnImage"
																			src="${displayImageURL}"
																			style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
 text-decoration: none; vertical-align: bottom; max-width:1200px; padding-bottom:
 0; display: inline !important; vertical-align: bottom;" width="600"></img>
																	</a>
																</a>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
						<tr>
							<td id="templateBody" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #ffffff;
 border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">
								<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
									<tbody class="mcnTextBlockOuter">
										<tr>
											<td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
												<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer"
													style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
 100%; min-width:100%;" width="100%">
													<tbody>
														<tr>
															<td class="mcnTextContent" style='mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
 color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
 line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
 padding-bottom: 9px; padding-left: 18px;' valign="top">

																<h1 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
 sans-serif; font-size: 32px; font-style: normal; font-weight: bold; line-height:
 125%; letter-spacing: 2px; text-align: center; display: block; margin: 0;
 padding: 0'><span style="text-transform:uppercase">Forgot</span></h1>


																<h2 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
 sans-serif; font-size: 24px; font-style: normal; font-weight: bold; line-height:
 125%; letter-spacing: 1px; text-align: center; display: block; margin: 0;
 padding: 0'><span style="text-transform:uppercase">your password?</span></h2>

															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
								<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace:
 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 min-width:100%;" width="100%">
									<tbody class="mcnTextBlockOuter">
										<tr>
											<td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
												<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer"
													style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
 100%; min-width:100%;" width="100%">
													<tbody>
														<tr>
															<td class="mcnTextContent" style='mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
 color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
 line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
 padding-bottom: 9px; padding-left: 18px;' valign="top">Not to worry, we got you! Let’s get you a new password.
																<br></br>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
								<table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 min-width:100%;" width="100%">
									<tbody class="mcnButtonBlockOuter">
										<tr>
											<td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
 exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 padding-top:18px; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
												<table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
													<tbody class="mcnButtonBlockOuter">
														<tr>
															<td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
 exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
																<table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer"
																	style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 border-collapse: separate !important;border-radius: 48px;background-color:
 #f84b4b;">
																	<tbody>
																		<tr>
																			<td align="center" class="mcnButtonContent" style="mso-line-height-rule:
 exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; padding-top:24px;
 padding-right:48px; padding-bottom:24px; padding-left:48px;" valign="middle">
																				<a class="mcnButton " href="${forgotPasswordURL}" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block; color: #f84b4b;
 font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing:
 1px;line-height: 100%;text-align: center;text-decoration: none;color:
 #FFFFFF; text-transform:uppercase;" target="_blank" title="Reset your CodeIsScience password">Reset password</a>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
								<table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
									<tbody class="mcnImageBlockOuter">
										<tr>
											<td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
												<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer"
													style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
 100%; min-width:100%;" width="100%">
													<tbody>
														<tr>
															<td class="mcnImageContent" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
 padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top"></td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
						<tr>
							<td id="templateFooter" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #e8ebed;
 border-top: 0; border-bottom: 0; padding-top: 8px; padding-bottom: 80px" valign="top">
								<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
									<tbody class="mcnTextBlockOuter">
										<tr>
											<td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
												<table align="center" bgcolor="#ffffff" border="0" cellpadding="32" cellspacing="0" class="card"
													style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
 100%; background:#ffffff; margin:auto; text-align:left; max-width:600px;
 font-family: 'Asap', Helvetica, sans-serif;" text-align="left" width="100%">
													<tr>
														<td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
 -webkit-text-size-adjust: 100%">

															<h3 style='color: #3e434a; font-family: "Asap", Helvetica, sans-serif;
 font-size: 20px; font-style: normal; font-weight: normal; line-height: 125%;
 letter-spacing: normal; text-align: center; display: block; margin: 0; padding:
 0; text-align: left; width: 100%; font-size: 16px; font-weight: bold; '>What is CodeIsScience?</h3>

															<p style='margin: 10px 0; padding: 0; mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;
 font-family: "Asap", Helvetica, sans-serif; font-size: 12px; line-height: 150%;
 text-align: left; text-align: left; font-size: 14px; '>
																CodeIsScience helps researchers find policy details for journal.
															</p>
															<div style="padding-bottom: 18px;">
																<a href="${codeIsScienceURL}" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
 -webkit-text-size-adjust: 100%; color: #f84b4b; font-weight: normal; text-decoration: none;
 font-size: 14px; color:#f84b4b; text-decoration:none;" target="_blank" title="Learn more about CodeIsScience">Learn
																	More ❯</a>
															</div>
														</td>
													</tr>
												</table>
												<table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">

												</table>
												<table align="center" border="0" cellpadding="12" style="border-collapse:
 collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust:
 100%; -webkit-text-size-adjust: 100%; ">
													<tbody>

													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</table>

				</td>
			</tr>
		</table>
	</center>
</body>

</html>
	`;
};

export default forgotPasswordEmailTemplate;
