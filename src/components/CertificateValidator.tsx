import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, QrCode, FileCheck, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CertificateValidator = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
      toast({
        title: "Files uploaded successfully",
        description: `${newFiles.length} file(s) ready for validation`,
      });
    }
  }, [toast]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      toast({
        title: "Files uploaded successfully",
        description: `${newFiles.length} file(s) ready for validation`,
      });
    }
  }, [toast]);

  const handleQRScan = useCallback(() => {
    toast({
      title: "QR Scanner",
      description: "QR code scanner functionality would be implemented here",
    });
  }, [toast]);

  const validateCertificates = useCallback(() => {
    if (files.length === 0) {
      toast({
        title: "No files to validate",
        description: "Please upload certificate files first",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Validation started",
      description: `Validating ${files.length} certificate(s)...`,
    });
  }, [files, toast]);

  return (
    <div className="min-h-screen bg-hero-gradient">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-primary-gradient bg-clip-text text-transparent">
              CertValidator
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold mb-6 bg-primary-gradient bg-clip-text text-transparent">
          Secure Certificate Validation
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Verify the authenticity of digital certificates, documents, and credentials with our advanced validation system
        </p>
        
        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Instant Verification</h3>
              <p className="text-sm text-muted-foreground">
                Get validation results in seconds
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Bank-Grade Security</h3>
              <p className="text-sm text-muted-foreground">
                Military-grade encryption for your data
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <FileCheck className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Multiple Formats</h3>
              <p className="text-sm text-muted-foreground">
                Support for PDF, images, and QR codes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Validation Area */}
        <Card className="max-w-4xl mx-auto shadow-strong border-0 bg-card/90 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Drag & Drop Area */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-primary bg-primary/5 scale-[1.02]' 
                  : 'border-border hover:border-primary/50 hover:bg-primary/5'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className={`h-16 w-16 mx-auto mb-4 transition-colors ${
                dragActive ? 'text-primary' : 'text-muted-foreground'
              }`} />
              <h3 className="text-xl font-semibold mb-2">
                Drop your certificates here
              </h3>
              <p className="text-muted-foreground mb-6">
                Drag and drop files or use the upload button below
              </p>
              
              {/* File Upload Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button variant="default" size="lg" className="bg-primary-gradient hover:shadow-soft">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Files
                  </Button>
                </div>
                
                <span className="text-muted-foreground text-sm">or</span>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleQRScan}
                  className="border-primary/20 hover:bg-primary/5"
                >
                  <QrCode className="mr-2 h-5 w-5" />
                  Scan QR Code
                </Button>
              </div>
            </div>

            {/* Uploaded Files */}
            {files.length > 0 && (
              <div className="mt-8">
                <h4 className="font-semibold mb-4 flex items-center">
                  <FileCheck className="mr-2 h-5 w-5 text-accent" />
                  Uploaded Files ({files.length})
                </h4>
                <div className="grid gap-3">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileCheck className="h-5 w-5 text-accent" />
                        <span className="font-medium">{file.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={validateCertificates}
                  className="w-full mt-6 bg-primary-gradient hover:shadow-soft"
                  size="lg"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Validate Certificates
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default CertificateValidator;