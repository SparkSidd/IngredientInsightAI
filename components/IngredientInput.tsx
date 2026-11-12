'use client';

import React, { useState, useRef } from 'react';
import { Upload, Mic, MicOff, Trash2, ImageIcon } from 'lucide-react';

interface IngredientInputProps {
  onSubmit: (data: {
    imageFile?: File;
    imagePreview?: string;
    ingredients: string;
    userNote: string;
    productType: string;
  }) => void;
  isProcessing: boolean;
}

export default function IngredientInput({ onSubmit, isProcessing }: IngredientInputProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [ingredients, setIngredients] = useState('');
  const [userNote, setUserNote] = useState('');
  const [productType, setProductType] = useState('');
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Try Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setUserNote(prev => prev ? `${prev} ${transcript}` : transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) {
      alert('Please enter ingredient list or upload an image');
      return;
    }

    onSubmit({
      imageFile: imageFile || undefined,
      imagePreview: imagePreview || undefined,
      ingredients,
      userNote,
      productType,
    });
  };

  const handleClearImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const loadSample = () => {
    setIngredients('Water, Sugar, Orange Juice Concentrate (12%), Citric Acid, Natural Flavors, Ascorbic Acid (Vitamin C), Beta-Carotene (Color), Sodium Benzoate (Preservative), Potassium Sorbate (Preservative)');
    setProductType('Juice');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Scan or Enter Ingredients
          </h2>
          <p className="text-gray-600">
            Upload a product image or paste the ingredient list — your AI co-pilot will do the rest
          </p>
        </div>

        {/* Image Upload Area */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Product Image (Optional)
          </label>
          
          {imagePreview ? (
            <div className="relative rounded-xl overflow-hidden border-2 border-gray-200">
              <img 
                src={imagePreview} 
                alt="Product preview" 
                className="w-full h-64 object-contain bg-gray-50"
              />
              <button
                type="button"
                onClick={handleClearImage}
                className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary-500 hover:bg-primary-50 transition cursor-pointer"
            >
              <ImageIcon className="mx-auto mb-3 text-gray-400" size={48} />
              <p className="text-gray-600 mb-1">Click to upload product image</p>
              <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Ingredients Textarea */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-semibold text-gray-700">
              Ingredient List *
            </label>
            <button
              type="button"
              onClick={loadSample}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Load Sample
            </button>
          </div>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Paste ingredient list here (e.g., Water, Sugar, Natural Flavors, Citric Acid...)"
            className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
            required
          />
        </div>

        {/* Product Type */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Product Type (Optional)
          </label>
          <input
            type="text"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            placeholder="e.g., Juice, Snack Bar, Cereal"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* User Note with Voice Input */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Your Context (Optional)
          </label>
          <div className="relative">
            <textarea
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="e.g., 'Need quick energy before workout' or 'Looking for healthy option for kids'"
              className="w-full h-24 px-4 py-3 pr-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
            />
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`absolute right-3 top-3 p-2 rounded-full transition ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          </div>
          {isListening && (
            <p className="text-sm text-red-600 animate-pulse">
              🎤 Listening... speak now
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Ingredients...
            </span>
          ) : (
            '🔍 Analyze with AI Co-Pilot'
          )}
        </button>
      </form>
    </div>
  );
}
