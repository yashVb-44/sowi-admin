import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ProjectListProvider } from "./Context/ProjectListContext";
import { PaymentProvider } from "./Context/PaymentContext";
import { BlogDetailProvider } from "./Context/BlogDetailContext";
import { AddProjectProvider } from "./AdminContext/AddProjectContext";
import { FundraiseProvider } from "./Context/FundraiseContext";
import { AuthProvider } from "./Context/AuthContext";
import { LanguageProvider } from "./Context/LanguageContext";
import { WordOfSupportProvider } from "./Context/WordOfSupportContext";
import { AdminSectionProvider } from "./Context/AdminSectionContext";
import { ContentProvider } from "./Context/ContentContext";
import { AddCategoryProvider } from "./AdminContext/AddCategoryContext";
import { AddBlogProvider } from "./AdminContext/AddBlogContext";
import { AddTeamProvider } from "./AdminContext/AddTeamContext";
import { AddContactProvider } from "./AdminContext/AddContactContext";
import { UserDetailProvider } from "./Context/UserDetailsContext";
import { ShopServiceDetailProvider } from "./Context/ShopServiceDetails";
import { EmergencyServiceDetailProvider } from "./Context/EmergencyServiceDetails";
import { CategoryDetailProvider } from "./Context/CategoryDetails";
import { ExpenseCategoryDetailProvider } from "./Context/ExpenseCategoryDetails";
import { CompanyDetailProvider } from "./Context/CompanyDetails";
import { VehicleDetailProvider } from "./Context/VehicleDetails";
import { SupportDetailProvider } from "./Context/SupportDetails";
import { VendorDetailProvider } from "./Context/VendorDetailsContext";
import { BannerDetailProvider } from "./Context/BannerDetails";
import { VideoLibraryDetailProvider } from "./Context/VideoLibraryDetails";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProjectListProvider>
      <PaymentProvider>
        <BlogDetailProvider>
          <UserDetailProvider>
            <VendorDetailProvider>
              <ShopServiceDetailProvider>
                <EmergencyServiceDetailProvider>
                  <CategoryDetailProvider>
                    <ExpenseCategoryDetailProvider>
                      <CompanyDetailProvider>
                        <VehicleDetailProvider>
                          <SupportDetailProvider>
                            <BannerDetailProvider>
                              <VideoLibraryDetailProvider>
                                <AddProjectProvider>
                                  <FundraiseProvider>
                                    <AuthProvider>
                                      <LanguageProvider>
                                        <WordOfSupportProvider>
                                          <AdminSectionProvider>
                                            <ContentProvider>
                                              <AddCategoryProvider>
                                                <AddBlogProvider>
                                                  <AddTeamProvider>
                                                    <AddContactProvider>
                                                      <App />
                                                    </AddContactProvider>
                                                  </AddTeamProvider>
                                                </AddBlogProvider>
                                              </AddCategoryProvider>
                                            </ContentProvider>
                                          </AdminSectionProvider>
                                        </WordOfSupportProvider>
                                      </LanguageProvider>
                                    </AuthProvider>
                                  </FundraiseProvider>
                                </AddProjectProvider>
                              </VideoLibraryDetailProvider>
                            </BannerDetailProvider>
                          </SupportDetailProvider>
                        </VehicleDetailProvider>
                      </CompanyDetailProvider>
                    </ExpenseCategoryDetailProvider>
                  </CategoryDetailProvider>
                </EmergencyServiceDetailProvider>
              </ShopServiceDetailProvider>
            </VendorDetailProvider>
          </UserDetailProvider >
        </BlogDetailProvider>
      </PaymentProvider>
    </ProjectListProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
